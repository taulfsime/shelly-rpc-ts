import { canonicalize, hashRpcRequest, hashString } from '../src/utils/hash.js';
import { describe, it, expect } from 'vitest';

describe('canonicalize', () => {
  it('returns primitives as-is', () => {
    expect(canonicalize(42)).toBe(42);
    expect(canonicalize('foo')).toBe('foo');
    expect(canonicalize(null)).toBe(null);
    expect(canonicalize(undefined)).toBe(undefined);
    expect(canonicalize(true)).toBe(true);
  });

  it('sorts object keys recursively', () => {
    const input = { b: 2, a: 1, c: { z: 9, y: 8 } };
    const output = canonicalize(input);
    expect(Object.keys(output)).toEqual(['a', 'b', 'c']);
    expect(Object.keys(output.c)).toEqual(['y', 'z']);
    expect(output).toEqual({ a: 1, b: 2, c: { y: 8, z: 9 } });
  });

  it('handles arrays of objects', () => {
    const input = [
      { b: 2, a: 1 },
      { d: 4, c: 3 },
    ];
    const output = canonicalize(input);
    expect(output).toEqual([
      { a: 1, b: 2 },
      { c: 3, d: 4 },
    ]);
  });

  it('handles nested arrays and objects', () => {
    const input = { foo: [{ b: 2, a: 1 }, 3, [{ d: 4, c: 3 }]] };
    const output = canonicalize(input);
    expect(output).toEqual({ foo: [{ a: 1, b: 2 }, 3, [{ c: 3, d: 4 }]] });
  });

  it('does not mutate the input', () => {
    const input = { b: 2, a: 1 };
    const copy = { ...input };
    canonicalize(input);
    expect(input).toEqual(copy);
  });
});

describe('hashString', () => {
  it('returns the same hash for the same string', () => {
    expect(hashString('hello')).toBe(hashString('hello'));
    expect(hashString('')).toBe(hashString(''));
  });

  it('returns different hashes for different strings', () => {
    expect(hashString('hello')).not.toBe(hashString('world'));
    expect(hashString('abc')).not.toBe(hashString('def'));
  });

  it('produces a hexadecimal string', () => {
    const hash = hashString('test');
    expect(typeof hash).toBe('string');
    expect(hash).toMatch(/^[0-9a-f]+$/);
  });

  it('is deterministic for unicode', () => {
    expect(hashString('héllo')).toBe(hashString('héllo'));
    expect(hashString('héllo')).not.toBe(hashString('hello'));
  });

  it('handles long strings', () => {
    const long = 'a'.repeat(1000);
    expect(typeof hashString(long)).toBe('string');
  });
});

describe('hashRpcRequest', () => {
  it('returns the same hash for same method and params (order-insensitive)', () => {
    const m = 'Shelly.GetDeviceInfo';
    const p1 = { a: 1, b: 2 };
    const p2 = { b: 2, a: 1 };
    expect(hashRpcRequest(m, p1)).toBe(hashRpcRequest(m, p2));
  });

  it('returns different hashes for different methods', () => {
    const p = { foo: 'bar' };
    expect(hashRpcRequest('Shelly.GetComponents', p)).not.toBe(
      hashRpcRequest('Switch.GetConfig', p)
    );
  });

  it('returns different hashes for different params', () => {
    expect(hashRpcRequest('Shelly.GetDeviceInfo', { x: 1 })).not.toBe(
      hashRpcRequest('Shelly.GetDeviceInfo', { x: 2 })
    );
  });
});
