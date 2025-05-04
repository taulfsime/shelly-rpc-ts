import { describe, it, expect } from 'vitest';
import { isRpcNotification, isRpcResponse } from '../src/ShellyRpc.js';

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

describe('isRpcNotification', () => {
  it('returns true for valid NotifyStatus', () => {
    const data = {
      src: 'device1',
      dst: 'host',
      method: 'NotifyStatus',
      params: {},
    };
    expect(isRpcNotification(data)).toBe(true);
  });

  it('returns true for valid NotifyFullStatus', () => {
    const data = {
      src: 'device2',
      dst: 'host',
      method: 'NotifyFullStatus',
      params: {},
    };
    expect(isRpcNotification(data)).toBe(true);
  });

  it('returns true for valid NotifyEvent', () => {
    const data = {
      src: 'device3',
      dst: 'host',
      method: 'NotifyEvent',
      params: {},
    };
    expect(isRpcNotification(data)).toBe(true);
  });

  it('returns false for other method names', () => {
    const data = {
      src: 'device',
      dst: 'host',
      method: 'Switch.Set',
      params: {},
    };
    expect(isRpcNotification(data)).toBe(false);
  });

  it('returns false if data is null', () => {
    expect(isRpcNotification(null)).toBe(false);
  });

  it('returns false if data is a primitive', () => {
    expect(isRpcNotification('string')).toBe(false);
    expect(isRpcNotification(42)).toBe(false);
    expect(isRpcNotification(true)).toBe(false);
  });

  it('returns false if data is an array', () => {
    expect(isRpcNotification([])).toBe(false);
  });

  it('returns false if src is missing or not a string', () => {
    expect(
      isRpcNotification({ dst: 'host', method: 'NotifyStatus', params: {} })
    ).toBe(false);
    expect(
      isRpcNotification({
        src: 123,
        dst: 'host',
        method: 'NotifyStatus',
        params: {},
      })
    ).toBe(false);
  });

  it('returns false if dst is missing or not a string', () => {
    expect(
      isRpcNotification({ src: 'device', method: 'NotifyStatus', params: {} })
    ).toBe(false);
    expect(
      isRpcNotification({
        src: 'device',
        dst: 123,
        method: 'NotifyStatus',
        params: {},
      })
    ).toBe(false);
  });

  it('returns false if method is missing or not a string', () => {
    expect(isRpcNotification({ src: 'device', dst: 'host', params: {} })).toBe(
      false
    );
    expect(
      isRpcNotification({ src: 'device', dst: 'host', method: 42, params: {} })
    ).toBe(false);
  });

  it('returns false if params is missing', () => {
    expect(
      isRpcNotification({ src: 'device', dst: 'host', method: 'NotifyStatus' })
    ).toBe(false);
  });
});
