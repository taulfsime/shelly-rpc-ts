#!/usr/bin/env node

import { execSync } from 'child_process';
import { Command } from 'commander';
import { ClaudeProvider } from './ai-provider.js';
import * as fs from 'fs';
import * as path from 'path';

interface CommitInfo {
  hash: string;
  subject: string;
  body: string;
  changedFiles: string[];
  diff: string;
}

interface ChangelogEntry {
  category: string;
  description: string;
}

interface ChangelogVersion {
  version: string;
  date: string;
  entries: Map<string, string[]>; // category -> descriptions
}

interface VersionInfo {
  version: string;
  commits: CommitInfo[];
  bumpCommitDate?: string;
}

function parseExistingChangelog(content: string): ChangelogVersion[] {
  const versions: ChangelogVersion[] = [];
  const lines = content.split('\n');
  let currentVersion: ChangelogVersion | null = null;
  let currentCategory: string | null = null;

  for (const line of lines) {
    const versionMatch = line.match(/^\[([^\]]+)\]\s+(\d{4}-\d{2}-\d{2})$/);
    if (versionMatch) {
      if (currentVersion) {
        versions.push(currentVersion);
      }
      currentVersion = {
        version: versionMatch[1],
        date: versionMatch[2],
        entries: new Map(),
      };
      currentCategory = null;
      continue;
    }

    if (currentVersion && line.trim() && !line.startsWith('-')) {
      // This is a category header
      currentCategory = line.trim();
      if (!currentVersion.entries.has(currentCategory)) {
        currentVersion.entries.set(currentCategory, []);
      }
      continue;
    }

    if (currentVersion && currentCategory && line.trim().startsWith('-')) {
      const description = line.trim().substring(1).trim();
      currentVersion.entries.get(currentCategory)!.push(description);
    }
  }

  if (currentVersion) {
    versions.push(currentVersion);
  }

  return versions;
}

function formatChangelog(versions: ChangelogVersion[]): string {
  return versions
    .map(version => {
      let output = `[${version.version}] ${version.date}\n`;

      for (const [category, descriptions] of version.entries) {
        output += `\n${category}\n\n`;
        for (const desc of descriptions) {
          output += `- ${desc}\n`;
        }
      }

      return output;
    })
    .join('\n');
}

function getCommitRange(base: string, head: string = 'HEAD'): string[] {
  try {
    const output = execSync(`git rev-list --no-merges ${base}..${head}`, {
      encoding: 'utf8',
    });
    return output.trim().split('\n').filter(Boolean).reverse();
  } catch (e) {
    throw new Error('Could not determine commit range');
  }
}

function getCommitInfo(commitHash: string): CommitInfo {
  try {
    const message = execSync(`git log -1 --pretty=%B ${commitHash}`, {
      encoding: 'utf8',
    }).trim();

    const [subject, ...bodyLines] = message.split('\n');
    const body = bodyLines.join('\n').trim();

    const changedFiles = execSync(
      `git diff-tree --no-commit-id --name-only -r ${commitHash}`,
      { encoding: 'utf8' }
    )
      .trim()
      .split('\n')
      .filter(Boolean);

    const diff = execSync(`git show ${commitHash}`, {
      encoding: 'utf8',
      maxBuffer: 1024 * 1024 * 10,
    });

    return {
      hash: commitHash,
      subject,
      body,
      changedFiles,
      diff,
    };
  } catch (e) {
    throw new Error(`Could not get commit info for ${commitHash}`);
  }
}

function truncateDiffs(diffs: string, maxLength: number = 80000): string {
  return diffs.length > maxLength
    ? diffs.substring(0, maxLength) + '\n\n[... diff truncated ...]'
    : diffs;
}

function estimatePromptSize(commits: CommitInfo[]): number {
  let size = 1000; // Base prompt size
  for (const commit of commits) {
    const truncatedDiff = truncateDiffs(commit.diff, 20000);
    size +=
      commit.subject.length +
      commit.body.length +
      commit.changedFiles.join('\n').length +
      truncatedDiff.length +
      100; // overhead
  }
  return size;
}

function buildChangelogPrompt(commits: CommitInfo[]): string {
  const commitDescriptions = commits
    .map(commit => {
      const truncatedDiff = truncateDiffs(commit.diff, 20000);
      return `
COMMIT: ${commit.hash.substring(0, 7)}
SUBJECT: ${commit.subject}
${commit.body ? `BODY: ${commit.body}\n` : ''}
CHANGED FILES (${commit.changedFiles.length}):
${commit.changedFiles.join('\n')}

DIFF:
${truncatedDiff}
---
`;
    })
    .join('\n');

  return `You are a changelog generator. Based on the following commits, their messages, changed files, and diffs, generate a simple changelog entry.

${commitDescriptions}

Please generate a changelog entry that:
1. Lists changes under "Fixed", "Added", or "Changed" sections as appropriate
2. Is brief and to the point - one line per distinct feature or fix
3. Combines related changes into a single entry (e.g., if multiple commits add the same feature, make it one line)
4. Focuses on what was actually changed from a user perspective
5. Does NOT use markdown headers (###) or bold text
6. Uses simple bullet points with "-"
7. Avoids marketing language or verbose descriptions
8. Groups related changes together - don't create separate entries for the same feature

Example format:
[X.Y.Z] YYYY-MM-DD

Fixed

- Component name: Brief description of what was fixed
- Another fix description

Added

- Brief description of what was added

Respond with a JSON object containing the changelog entries as an array:
{
  "entries": [
    {"category": "Fixed", "description": "Component name: Brief description"},
    {"category": "Added", "description": "Brief description"}
  ]
}

Keep each entry concise and factual. Combine related changes into single entries.`;
}

function getVersionFromGit(ref: string = 'HEAD'): string {
  try {
    const packageJson = execSync(`git show ${ref}:package.json`, {
      encoding: 'utf8',
    });
    const parsed = JSON.parse(packageJson);
    return parsed.version;
  } catch (e) {
    throw new Error(`Could not read version from package.json at ${ref}`);
  }
}

async function generateChangelog(
  base: string,
  options: { output?: string; version?: string; head?: string }
): Promise<void> {
  const head = options.head || 'HEAD';
  console.log(`Analyzing commits from ${base} to ${head}...`);

  const aiProvider = new ClaudeProvider();
  const commitHashes = getCommitRange(base, head);

  if (commitHashes.length === 0) {
    console.log('No commits found in range.');
    process.exit(0);
  }

  console.log(`Found ${commitHashes.length} commit(s) in range.\n`);

  // Group commits by the NEXT version (commits before a version bump belong to that version)
  const versionInfoMap = new Map<string, VersionInfo>();
  let currentTargetVersion = 'UNRELEASED';

  // Process commits in reverse (newest to oldest) to track version changes
  for (let i = commitHashes.length - 1; i >= 0; i--) {
    const hash = commitHashes[i];
    const info = getCommitInfo(hash);
    const commitVersion = getVersionFromGit(hash);

    // Check if this commit changed the version (is a version bump)
    const isVersionBump =
      info.changedFiles.includes('package.json') &&
      info.diff.match(/^\+\s*"version":\s*"([^"]+)"/m);

    if (isVersionBump) {
      // Store the bump commit date for this version
      if (!versionInfoMap.has(commitVersion)) {
        // Get commit date in YYYY-MM-DD format
        const commitDate = execSync(`git log -1 --format=%cI ${hash}`, {
          encoding: 'utf8',
        })
          .trim()
          .split('T')[0];

        versionInfoMap.set(commitVersion, {
          version: commitVersion,
          commits: [],
          bumpCommitDate: commitDate,
        });
      }

      // Add this commit to the current version (it belongs to the version it bumps to)
      versionInfoMap.get(commitVersion)!.commits.push(info);

      // Now switch context: future commits (going backward in time) belong to this version
      currentTargetVersion = commitVersion;
      continue;
    }

    if (!versionInfoMap.has(currentTargetVersion)) {
      versionInfoMap.set(currentTargetVersion, {
        version: currentTargetVersion,
        commits: [],
      });
    }
    versionInfoMap.get(currentTargetVersion)!.commits.push(info);
  }

  // If a specific version is requested, filter to just that version
  let versionsToProcess = options.version
    ? Array.from(versionInfoMap.keys()).filter(v => v === options.version)
    : Array.from(versionInfoMap.keys());

  // Filter out versions with no commits
  versionsToProcess = versionsToProcess.filter(v => {
    const info = versionInfoMap.get(v);
    return info && info.commits.length > 0;
  });

  if (versionsToProcess.length === 0) {
    console.log(
      options.version
        ? `No commits found for version ${options.version}.`
        : 'No versions found with commits.'
    );
    process.exit(0);
  }

  console.log(
    `Found ${versionsToProcess.length} version(s) to process: ${versionsToProcess.join(', ')}\n`
  );

  // Parse existing changelog if it exists
  let versions: ChangelogVersion[] = [];
  const outputPath = options.output ? path.resolve(options.output) : null;

  if (outputPath && fs.existsSync(outputPath)) {
    const existingContent = fs.readFileSync(outputPath, 'utf8');
    versions = parseExistingChangelog(existingContent);
  }

  // Helper to write changelog at any point
  const writeChangelog = () => {
    if (outputPath) {
      // Sort versions before writing: UNRELEASED first, then by version number descending
      const sortedVersions = [...versions].sort((a, b) => {
        if (a.version === 'UNRELEASED') return -1;
        if (b.version === 'UNRELEASED') return 1;

        // Compare version numbers (simple string comparison works for most semantic versions)
        const aParts = a.version.split('.').map(Number);
        const bParts = b.version.split('.').map(Number);

        for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
          const aVal = aParts[i] || 0;
          const bVal = bParts[i] || 0;
          if (aVal !== bVal) {
            return bVal - aVal; // Descending order
          }
        }
        return 0;
      });

      const changelog = formatChangelog(sortedVersions);
      fs.writeFileSync(outputPath, changelog, 'utf8');
    }
  };

  try {
    // Process each version
    for (const version of versionsToProcess) {
      const versionInfo = versionInfoMap.get(version)!;
      const commits = versionInfo.commits;

      console.log(
        `Processing version ${version} with ${commits.length} commit(s):`
      );
      for (const commit of commits) {
        console.log(`  ${commit.hash.substring(0, 7)}: ${commit.subject}`);
      }
      console.log();

      // Skip versions with no commits
      if (commits.length === 0) {
        console.log(`Skipping version ${version} (no commits)\n`);
        continue;
      }

      // Use bump commit date if available, otherwise use current date
      const versionDate =
        versionInfo.bumpCommitDate || new Date().toISOString().split('T')[0];

      // Find or create the version
      let targetVersion = versions.find(v => v.version === version);

      if (!targetVersion) {
        targetVersion = {
          version: version,
          date: versionDate,
          entries: new Map(),
        };
        versions.unshift(targetVersion); // Add at the beginning
      }

      // Check if we need to split the commits into batches
      const MAX_PROMPT_SIZE = 100000; // Conservative limit (API limit is ~200k tokens)
      const estimatedSize = estimatePromptSize(commits);

      let commitBatches: CommitInfo[][] = [];
      if (estimatedSize > MAX_PROMPT_SIZE) {
        console.log(
          `Large request detected (~${Math.round(estimatedSize / 1000)}k chars). Splitting into batches...`
        );

        // Split commits into batches that fit within the limit
        let currentBatch: CommitInfo[] = [];
        let currentBatchSize = 0;

        for (const commit of commits) {
          const commitSize = estimatePromptSize([commit]);

          if (
            currentBatchSize + commitSize > MAX_PROMPT_SIZE &&
            currentBatch.length > 0
          ) {
            commitBatches.push(currentBatch);
            currentBatch = [commit];
            currentBatchSize = commitSize;
          } else {
            currentBatch.push(commit);
            currentBatchSize += commitSize;
          }
        }

        if (currentBatch.length > 0) {
          commitBatches.push(currentBatch);
        }

        console.log(`Split into ${commitBatches.length} batch(es)\n`);
      } else {
        commitBatches = [commits];
      }

      // Process each batch
      for (let batchIdx = 0; batchIdx < commitBatches.length; batchIdx++) {
        const batch = commitBatches[batchIdx];

        if (commitBatches.length > 1) {
          console.log(
            `Processing batch ${batchIdx + 1}/${commitBatches.length} (${batch.length} commits)...`
          );
        }

        try {
          const prompt = buildChangelogPrompt(batch);
          const result = await aiProvider.call(prompt);
          const entries: ChangelogEntry[] = result.entries || [];

          // Add new entries to the version
          for (const entry of entries) {
            if (!targetVersion.entries.has(entry.category)) {
              targetVersion.entries.set(entry.category, []);
            }
            targetVersion.entries.get(entry.category)!.push(entry.description);
          }

          if (commitBatches.length > 1) {
            console.log(
              `Completed batch ${batchIdx + 1}/${commitBatches.length}\n`
            );
          }
        } catch (error) {
          console.error(
            `[ERROR] Failed to process batch ${batchIdx + 1}: ${(error as Error).message}`
          );
          console.error('Writing changelog with entries processed so far...');
          writeChangelog();
          throw error;
        }
      }

      console.log(`Completed version ${version}\n`);

      // Write changelog after each version is processed
      writeChangelog();
      if (outputPath) {
        console.log(`Changelog updated: ${outputPath}\n`);
      }
    }

    // For final display, sort and format
    const sortedVersions = [...versions].sort((a, b) => {
      if (a.version === 'UNRELEASED') return -1;
      if (b.version === 'UNRELEASED') return 1;

      const aParts = a.version.split('.').map(Number);
      const bParts = b.version.split('.').map(Number);

      for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
        const aVal = aParts[i] || 0;
        const bVal = bParts[i] || 0;
        if (aVal !== bVal) {
          return bVal - aVal;
        }
      }
      return 0;
    });

    const changelog = formatChangelog(sortedVersions);

    console.log('Generated Changelog:');
    console.log('='.repeat(60));
    console.log(changelog);
    console.log('='.repeat(60));

    if (outputPath) {
      console.log(`\nFinal changelog at: ${outputPath}`);
    }

    process.exit(0);
  } catch (e) {
    const error = e as Error;
    console.error(`[ERROR] ${error.message}\n`);

    // Ensure we write whatever we've processed so far
    writeChangelog();
    if (outputPath) {
      console.error(`Partial changelog written to: ${outputPath}`);
    }

    process.exit(1);
  }
}

const program = new Command();

program
  .name('changelog-generator')
  .argument(
    '<base>',
    'Base commit/branch/tag to compare against (e.g., v0.6.0, origin/main)'
  )
  .option('-o, --output <file>', 'Output file path (e.g., CHANGELOG.md)')
  .option(
    '-v, --version <version>',
    'Version number to include in changelog (e.g., 0.7.0)'
  )
  .option('--head <ref>', 'Head commit/branch (default: HEAD)')
  .action(generateChangelog);

program.parse();
