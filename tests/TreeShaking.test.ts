import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { execSync } from 'child_process';
import { writeFileSync, mkdtempSync, rmSync, readFileSync } from 'fs';
import { join, resolve } from 'path';
import { tmpdir } from 'os';
import * as esbuild from 'esbuild';

const projectRoot = resolve(import.meta.dirname, '..');
const distEntry = resolve(projectRoot, 'dist', 'index.js');
let tempDir: string;
let entryCounter = 0;

async function bundle(code: string): Promise<string> {
  const entry = join(tempDir, `entry-${entryCounter++}.js`);
  writeFileSync(entry, code);

  const result = await esbuild.build({
    entryPoints: [entry],
    bundle: true,
    format: 'esm',
    treeShaking: true,
    write: false,
    logLevel: 'silent',
  });

  return result.outputFiles[0].text;
}

describe('Tree Shaking', () => {
  beforeAll(() => {
    execSync('npm run build', { cwd: projectRoot, stdio: 'pipe' });
    tempDir = mkdtempSync(join(tmpdir(), 'shelly-tree-shake-'));
  });

  afterAll(() => {
    rmSync(tempDir, { recursive: true });
  });

  it('should declare sideEffects: false in package.json', () => {
    const pkg = JSON.parse(
      readFileSync(resolve(projectRoot, 'package.json'), 'utf8')
    );
    expect(pkg.sideEffects).toBe(false);
  });

  it('should emit ESM export statements in compiled output', () => {
    const indexJs = readFileSync(distEntry, 'utf8');
    expect(indexJs).toContain('export');
    expect(indexJs).not.toContain('module.exports');
    expect(indexJs).not.toContain('require(');
  });

  it('should produce empty bundle when imports are unused', async () => {
    const output = await bundle(
      `import { isRpcResponse } from "${distEntry}";`
    );
    expect(output).not.toContain('isRpcResponse');
    expect(output).not.toContain('parseComponentKey');
    expect(output).not.toContain('ShellyTransportBase');
  });

  it('should include only isRpcResponse when it alone is used', async () => {
    const output = await bundle(
      `import { isRpcResponse } from "${distEntry}"; console.log(isRpcResponse);`
    );
    expect(output).toContain('isRpcResponse');
    expect(output).not.toContain('ShellyTransportBase');
    expect(output).not.toContain('parseComponentKey');
  });

  it('should include only parseComponentKey when it alone is used', async () => {
    const output = await bundle(
      `import { parseComponentKey } from "${distEntry}"; console.log(parseComponentKey);`
    );
    expect(output).toContain('parseComponentKey');
    expect(output).not.toContain('isRpcResponse');
    expect(output).not.toContain('ShellyTransportBase');
  });

  it('should not include parseComponentKey when only ShellyTransportBase is used', async () => {
    const output = await bundle(
      `import { ShellyTransportBase } from "${distEntry}"; console.log(ShellyTransportBase);`
    );
    expect(output).toContain('ShellyTransportBase');
    expect(output).not.toContain('parseComponentKey');
  });
});
