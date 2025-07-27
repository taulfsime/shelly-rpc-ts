import {
  shelly_rpc_msg_request_t,
  shelly_rpc_notification_method_t,
  shelly_rpc_msg_request_id_t,
} from '../src/ShellyRpc';
import { ShellyTransportBase } from '../src/transport/ShellyTransportBase';
import { describe, it, beforeEach, expect, vi } from 'vitest';

const TEST_CLIENT_ID = 'test-client';

class TestTransport extends ShellyTransportBase {
  sentRequests: shelly_rpc_msg_request_t[] = [];
  sendResult = true;
  countRequestTries: Map<shelly_rpc_msg_request_id_t, number> = new Map();

  _onSend(req: shelly_rpc_msg_request_t): boolean {
    this.sentRequests.push(req);
    this.countRequestTries.set(
      req.id,
      (this.countRequestTries.get(req.id) || 0) + 1
    );
    return this.sendResult;
  }

  simulateResponse(
    id: shelly_rpc_msg_request_id_t,
    result?: any,
    error?: any
  ): boolean {
    return this.receive({
      id,
      dst: TEST_CLIENT_ID,
      src: 'shelly-device',
      result,
      error,
    });
  }

  simulateNotification(
    method: shelly_rpc_notification_method_t,
    params: any
  ): boolean {
    return this.receive({
      method,
      params,
      dst: TEST_CLIENT_ID,
      src: 'shelly-device',
    });
  }
}

describe('ShellyTransportBase', () => {
  let transport: TestTransport;

  beforeEach(() => {
    transport = new TestTransport(TEST_CLIENT_ID);
  });

  it('should send a request and resolve on response', async () => {
    const promise = transport.rpcRequest('Switch.Set', { id: 0, on: true });
    expect(transport.sentRequests.length).toBe(1);

    transport.simulateResponse(transport.sentRequests[0].id, { was_on: true });

    await expect(promise).resolves.toEqual({ was_on: true });
  });

  it('should reject on error response', async () => {
    const promise = transport.rpcRequest('Switch.Set', { id: 0, on: true });
    expect(transport.sentRequests.length).toBe(1);

    transport.simulateResponse(transport.sentRequests[0].id, undefined, {
      code: 123,
      message: 'fail',
    });

    await expect(promise).rejects.toBeDefined();
  });

  it('should call notification listeners', async () => {
    const listener = vi.fn();
    transport.on('NotifyStatus', listener);

    transport.simulateNotification('NotifyStatus', { some: 'data' });

    expect(listener).toHaveBeenCalledWith({ some: 'data' });
  });

  it('should allow unsubscribing notification listeners', async () => {
    const listener = vi.fn();
    transport.on('NotifyEvent', listener);

    transport.simulateNotification('NotifyEvent', { some: 'data' });
    expect(listener).toHaveBeenCalledWith({ some: 'data' });

    transport.off('NotifyEvent', listener);

    transport.simulateNotification('NotifyEvent', { some: 'data2' });
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('should handle request retries and fail after retries', async () => {
    transport.sendResult = false; // _onSend will fail
    const promise = transport.rpcRequest(
      'Switch.Set',
      { id: 0, on: true },
      { timeout: 10, numberOfRetries: 2 }
    );

    await expect(promise).rejects.toThrow('Request failed after retries');
  });

  it('should timeout if no response is received', async () => {
    const promise = transport.rpcRequest(
      'Switch.Set',
      { id: 0, on: true },
      { timeout: 10, numberOfRetries: 1 }
    );

    await expect(promise).rejects.toThrow('Request timed out');
  });

  it('should ignore responses for other clients', () => {
    const result = transport.receive({
      jsonrpc: '2.0',
      id: 1,
      dst: 'other-client',
      result: {},
    });
    expect(result).toBe(false);
  });

  it('should ignore unknown notifications', () => {
    const result = transport.receive({
      jsonrpc: '2.0',
      method: 'UnknownNotify',
      params: {},
    });
    expect(result).toBe(false);
  });

  it('should resolve ready immediately', async () => {
    await expect(transport.ready).resolves.toBeUndefined();
  });

  it('should handle multiple requests sequentially (one in flight)', async () => {
    const promise1 = transport.rpcRequest('Switch.Set', { id: 0, on: true });
    const promise2 = transport.rpcRequest('Switch.Toggle', { id: 1 });

    expect(transport.sentRequests.length).toBe(1);

    transport.simulateResponse(transport.sentRequests[0].id, { was_on: true });

    expect(transport.sentRequests.length).toBe(2);

    transport.simulateResponse(transport.sentRequests[1].id, { was_on: false });

    await expect(promise1).resolves.toEqual({ was_on: true });
    await expect(promise2).resolves.toEqual({ was_on: false });
  });

  it('should handle request retries correctly', async () => {
    transport.sendResult = false; // _onSend will fail
    const promise = transport.rpcRequest(
      'Switch.Set',
      { id: 0, on: true },
      { timeout: 10, numberOfRetries: 2 }
    );

    await expect(
      transport.countRequestTries.get(transport.sentRequests[0].id)
    ).toBe(2);
    await expect(promise).rejects.toThrow('Request failed after retries');
  });

  it('should return same promise for duplicate requests', async () => {
    vi.useFakeTimers();
    const promise1 = transport.rpcRequest(
      'Switch.Set',
      { id: 0, on: true },
      { timeout: 3000, debounce: 500 }
    );
    const promise2 = transport.rpcRequest(
      'Switch.Set',
      { id: 0, on: true },
      { timeout: 3000, debounce: 500 }
    );

    vi.advanceTimersByTime(500); // Simulate debounce time

    expect(transport.sentRequests.length).toBe(1);

    transport.simulateResponse(transport.sentRequests[0].id, { was_on: false });

    // Both promises should resolve with the same result
    const result1 = await promise1;
    const result2 = await promise2;
    expect(result1).toEqual({ was_on: false });
    expect(result2).toEqual({ was_on: false });
    expect(result1).toStrictEqual(result2); // Should be deeply equal
  });
});
