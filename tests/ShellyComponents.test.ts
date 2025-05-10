import { describe, it, expect, expectTypeOf } from 'vitest';
import { parseComponentKey } from '../src/ShellyComponents.js';

describe('parseComponentKey', () => {
  it('should return type only for single-instance keys', () => {
    expect(parseComponentKey('sys')).toEqual({ type: 'sys' });
    expect(parseComponentKey('wifi')).toEqual({ type: 'wifi' });
    expect(parseComponentKey('mqtt')).toEqual({ type: 'mqtt' });
  });

  it('should return type and id for multi-instance keys', () => {
    expect(parseComponentKey('switch:1')).toEqual({ type: 'switch', id: 1 });
    expect(parseComponentKey('boolean:200')).toEqual({
      type: 'boolean',
      id: 200,
    });
    expect(parseComponentKey('input:7')).toEqual({ type: 'input', id: 7 });
  });

  it('should parse keys with multi-digit ids', () => {
    expect(parseComponentKey('cover:1234')).toEqual({
      type: 'cover',
      id: 1234,
    });
  });

  it('should parse keys with id of 0', () => {
    expect(parseComponentKey('light:0')).toEqual({ type: 'light', id: 0 });
  });

  it('should coerce id to number', () => {
    const result = parseComponentKey('rgb:42');
    expect(result).toEqual({ type: 'rgb', id: 42 });
    expect(typeof result.id).toBe('number');
    expect(typeof result.type).toBe('string');
  });
});
