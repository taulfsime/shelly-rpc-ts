#!/usr/bin/env node

import { execSync } from 'child_process';
import { Command } from 'commander';
import { ClaudeProvider } from './ai-provider.js';

export type ValidationResult = {
  errors: string[];
  warnings: string[];
  suggestions: string[];
};

function getCommitMessage(commitHash: string = 'HEAD'): string {
  try {
    return execSync(`git log -1 --pretty=%B ${commitHash}`, {
      encoding: 'utf8',
    }).trim();
  } catch (e) {
    throw new Error('Could not read commit message');
  }
}

function getCommitRange(base?: string, singleCommit?: string): string[] {
  try {
    if (singleCommit) {
      // Check only a single specified commit
      return [singleCommit];
    }
    if (base) {
      // Use --no-merges to exclude merge commits
      const output = execSync(`git rev-list --no-merges ${base}..HEAD`, {
        encoding: 'utf8',
      });
      return output.trim().split('\n').filter(Boolean);
    }
    return ['HEAD'];
  } catch (e) {
    throw new Error('Could not determine commit range');
  }
}

function getChangedFiles(commitHash: string = 'HEAD'): string[] {
  try {
    const output = execSync(
      `git diff-tree --no-commit-id --name-only -r ${commitHash}`,
      {
        encoding: 'utf8',
      }
    );
    return output.trim().split('\n').filter(Boolean);
  } catch (e) {
    return [];
  }
}

function getFileDiffs(commitHash: string = 'HEAD'): string {
  try {
    return execSync(`git show ${commitHash}`, {
      encoding: 'utf8',
      maxBuffer: 1024 * 1024 * 10,
    });
  } catch (e) {
    return '';
  }
}

function getStagedDiff(): string {
  try {
    return execSync('git diff --cached', {
      encoding: 'utf8',
      maxBuffer: 1024 * 1024 * 10,
    });
  } catch (e) {
    return '';
  }
}

function truncateDiffs(diffs: string, maxLength: number = 50000): string {
  return diffs.length > maxLength
    ? diffs.substring(0, maxLength) + '\n\n[... diff truncated ...]'
    : diffs;
}

function buildValidationPrompt(
  subject: string,
  body: string,
  changedFiles: string[],
  diffs: string
): string {
  return `You are a commit message validator. Analyze the quality of this commit message and verify it accurately describes the changes.

COMMIT MESSAGE:
Subject: ${subject}
${body ? `\nBody:\n${body}` : ''}

CHANGED FILES:
${changedFiles.length > 0 ? changedFiles.join('\n') : 'No files detected'}

${diffs ? `\nFILE DIFFS:\n${diffs}` : ''}

Please evaluate:
1. Does the commit message accurately describe the actual changes made?
2. Is the message clear and understandable?
3. Does it use imperative mood (e.g., "Add feature" not "Added feature")?
4. Does it have obvious issues (WIP markers, placeholder text, typos)?
5. Is it appropriately concise (not too vague, not overly verbose)?

Respond ONLY with a JSON object in this exact format (no markdown, no backticks):
{
  "errors": [],
  "warnings": [],
  "suggestions": []
}

Where:
- errors: Critical issues that should block the commit (WIP markers, placeholder text, profanity, message completely mismatches changes)
- warnings: Issues that should be addressed but won't block (wrong tense, unclear wording, message doesn't accurately describe changes)
- suggestions: Optional improvements (keep these minimal and simple - only suggest if there's a clearly better alternative)
- Keep all messages very concise
- We don't strictly follow semantic commit format, so don't enforce it
- Most well-formed messages should pass with empty arrays
- Don't suggest adding more context or details unless the message is genuinely unclear or inaccurate`;
}

function buildSuggestionPrompt(changedFiles: string[], diffs: string): string {
  return `You are a commit message generator. Analyze the changes and suggest good commit messages.

CHANGED FILES:
${changedFiles.length > 0 ? changedFiles.join('\n') : 'No files detected'}

${diffs ? `\nFILE DIFFS:\n${diffs}` : ''}

Generate 3-5 commit message suggestions based on these changes. Each message should:
1. Accurately describe what was changed
2. Use imperative mood (e.g., "Add feature" not "Added feature")
3. Be clear and concise
4. Focus on the "what" and "why", not the "how"
5. Avoid semantic commit format (no "feat:", "fix:", etc.)

Respond ONLY with a JSON object (no markdown, no backticks):
{
  "suggestions": ["commit message 1", "commit message 2", ...]
}`;
}

async function checkCommits(
  base: string | undefined,
  options: { strict?: boolean; quiet?: boolean; ci?: boolean; commit?: string }
): Promise<void> {
  const aiProvider = new ClaudeProvider();
  const commits = getCommitRange(base, options.commit);
  const allResults: Array<{
    commit: string;
    subject: string;
    result: ValidationResult;
  }> = [];

  if (!options.quiet) {
    console.log(`Analyzing ${commits.length} commit(s) with AI...`);
  }

  for (const commit of commits) {
    const message = getCommitMessage(commit);
    const changedFiles = getChangedFiles(commit);
    const [subject, ...bodyLines] = message.split('\n');
    const body = bodyLines.join('\n').trim();

    if (!options.quiet) {
      console.log(`\n--- Checking commit: ${commit.substring(0, 7)} ---`);
      console.log(`Subject: ${subject}`);
      if (body) {
        console.log(
          `Body: ${body.substring(0, 100)}${body.length > 100 ? '...' : ''}`
        );
      }
      if (changedFiles.length > 0) {
        console.log(`Changed files: ${changedFiles.length}`);
      }
    }

    try {
      const diffs = truncateDiffs(getFileDiffs(commit));
      const prompt = buildValidationPrompt(subject, body, changedFiles, diffs);
      const result = await aiProvider.call(prompt);
      allResults.push({ commit, subject, result });
    } catch (e) {
      const error = e as Error;
      allResults.push({
        commit,
        subject,
        result: {
          errors: [`AI validation failed: ${error.message}`],
          warnings: [],
          suggestions: [],
        },
      });
    }
  }

  // Print results per commit
  const hasMultipleCommits = commits.length > 1;
  let hasAnyErrors = false;
  let hasAnyWarnings = false;

  for (const { commit, subject, result } of allResults) {
    const commitPrefix = hasMultipleCommits
      ? `[${commit.substring(0, 7)}] `
      : '';
    const subjectDisplay = hasMultipleCommits ? ` "${subject}"` : '';

    if (result.errors.length > 0) {
      hasAnyErrors = true;
      console.log(`\n${commitPrefix}[ERRORS]${subjectDisplay}`);
      result.errors.forEach(err => console.log(`  * ${err}`));
    }

    if (result.warnings.length > 0) {
      hasAnyWarnings = true;
      console.log(`\n${commitPrefix}[WARNINGS]${subjectDisplay}`);
      result.warnings.forEach(warn => console.log(`  * ${warn}`));
    }

    if (result.suggestions.length > 0) {
      console.log(`\n${commitPrefix}[SUGGESTIONS]${subjectDisplay}`);
      result.suggestions.forEach(sug => console.log(`  * ${sug}`));
    }
  }

  // Determine success
  const hasIssues = hasAnyErrors || hasAnyWarnings;

  if (!hasIssues) {
    console.log('\n[SUCCESS] All commit messages look good!\n');
    process.exit(0);
  }

  if (options.ci && hasIssues) {
    console.log('\n[FAILED] CI mode: Commit validation failed\n');
    process.exit(1);
  }

  if (hasAnyErrors) {
    console.log('\n[FAILED] Commit message validation failed\n');
    process.exit(1);
  }

  if (options.strict && hasAnyWarnings) {
    console.log('\n[FAILED] Commit message has warnings (strict mode)\n');
    process.exit(1);
  }

  console.log('\n[PASSED] Commit messages approved with notes\n');
  process.exit(0);
}

async function suggestCommand(): Promise<void> {
  const aiProvider = new ClaudeProvider();

  console.log('Analyzing staged changes...\n');

  const diffs = getStagedDiff();
  if (!diffs.trim()) {
    console.error(
      '[ERROR] No staged changes found. Stage your changes with "git add" first.\n'
    );
    process.exit(1);
  }

  const changedFiles = execSync('git diff --cached --name-only', {
    encoding: 'utf8',
  })
    .trim()
    .split('\n')
    .filter(Boolean);

  console.log(`Changed files: ${changedFiles.length}`);
  changedFiles.forEach(file => console.log(`  - ${file}`));
  console.log('\nGenerating commit message suggestions...\n');

  try {
    const truncatedDiffs = truncateDiffs(diffs);
    const prompt = buildSuggestionPrompt(changedFiles, truncatedDiffs);
    const result = await aiProvider.call(prompt);
    const suggestions = result.suggestions || [];

    if (suggestions.length === 0) {
      console.log('[INFO] No suggestions generated.\n');
      process.exit(0);
    }

    console.log('[SUGGESTIONS]');
    suggestions.forEach((sug: string, idx: number) => {
      console.log(`\n${idx + 1}. ${sug}`);
    });
    console.log('');
    process.exit(0);
  } catch (e) {
    const error = e as Error;
    console.error(`[ERROR] ${error.message}\n`);
    process.exit(1);
  }
}

const program = new Command();

program
  .command('check')
  .description('Check commit messages')
  .argument(
    '[base]',
    'Base commit/branch to compare against (e.g., origin/main, HEAD~3)'
  )
  .option('-s, --strict', 'Treat warnings as errors')
  .option('-q, --quiet', 'Only output on errors')
  .option('--ci', 'CI mode: fail on any errors or warnings')
  .option('-c, --commit <hash>', 'Check only a single commit (default: HEAD)')
  .action(checkCommits);

program
  .command('suggest')
  .description('Suggest commit messages based on staged changes')
  .action(suggestCommand);

program.parse();
