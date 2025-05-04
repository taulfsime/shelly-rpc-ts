import { describe, it, expect } from 'vitest';
import { isRpcResponse } from '../src/ShellyRpc.js';

describe('isRpcResponse', () => {
  it('returns true for valid response with result', () => {
    const data = {
      id: 1,
      src: 'device',
      dst: 'host',
      result: {},
    };
    expect(isRpcResponse(data)).toBe(true);
  });

  it('returns true for valid response with error', () => {
    const data = {
      id: 'abc',
      src: 'device',
      dst: 'host',
      error: { code: 123, message: 'Something went wrong' },
    };
    expect(isRpcResponse(data)).toBe(true);
  });

  it('returns false if data is not an object', () => {
    expect(isRpcResponse(null)).toBe(false);
    expect(isRpcResponse(42)).toBe(false);
    expect(isRpcResponse('string')).toBe(false);
    expect(isRpcResponse(undefined)).toBe(false);
  });

  it('returns false if data is an array', () => {
    expect(isRpcResponse([])).toBe(false);
  });

  it('returns false if id is missing', () => {
    const data = { src: 'device', dst: 'host', result: {} };
    expect(isRpcResponse(data)).toBe(false);
  });

  it('returns false if id is not string or number', () => {
    const data = { id: {}, src: 'device', dst: 'host', result: {} };
    expect(isRpcResponse(data)).toBe(false);
  });

  it('returns false if src is missing or not a string', () => {
    expect(isRpcResponse({ id: 1, dst: 'host', result: {} })).toBe(false);
    expect(isRpcResponse({ id: 1, src: 123, dst: 'host', result: {} })).toBe(
      false
    );
  });

  it('returns false if dst is missing or not a string', () => {
    expect(isRpcResponse({ id: 1, src: 'device', result: {} })).toBe(false);
    expect(isRpcResponse({ id: 1, src: 'device', dst: 123, result: {} })).toBe(
      false
    );
  });

  it('returns false if neither result nor error is present', () => {
    const data = { id: 1, src: 'device', dst: 'host' };
    expect(isRpcResponse(data)).toBe(false);
  });
});
