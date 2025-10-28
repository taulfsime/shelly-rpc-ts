import {
  isRpcNotification,
  isRpcResponse,
  shelly_rpc_auth_request_t,
  shelly_rpc_method_params_t,
  shelly_rpc_method_result_t,
  shelly_rpc_method_t,
  shelly_rpc_msg_request_id_t,
  shelly_rpc_msg_request_t,
  shelly_rpc_notification_method_t,
  shelly_rpc_notification_notify_event_t,
  shelly_rpc_notification_notify_status_t,
} from '../ShellyRpc.js';
import { deepEqual } from '../utils/deep-equal.js';

type shelly_listener_params_t = {
  NotifyStatus: shelly_rpc_notification_notify_status_t['params'];
  NotifyFullStatus: shelly_rpc_notification_notify_status_t['params'];
  NotifyEvent: shelly_rpc_notification_notify_event_t['params'];
};

type shelly_listener_t<
  M extends shelly_rpc_notification_method_t = shelly_rpc_notification_method_t,
> = (msg: shelly_listener_params_t[M]) => void;

export type shelly_transport_rpc_options_t = {
  timeout?: number;
  numberOfRetries?: number;
  debounce?: number;
  auth?: shelly_rpc_auth_request_t; //XXX: TODO: add tests
  //TODO: add priority?
};

type shelly_transport_response_map_t<
  K extends shelly_rpc_method_t = shelly_rpc_method_t,
> = {
  method: K;
  params: shelly_rpc_method_params_t<K>;
  onResponse: ((result: any) => void)[];
  onError: ((error: any) => void)[];
  options: Partial<
    Omit<shelly_transport_rpc_options_t, 'timeout' | 'numberOfRetries'>
  > &
    Required<
      Pick<shelly_transport_rpc_options_t, 'timeout' | 'numberOfRetries'>
    >;
  timeoutId?: number;
  debounceTimeoutId?: number;
};

export abstract class ShellyTransportBase {
  private readonly clientId: string;
  private readonly requestsInFlight: number = 1;
  private msgCounter: number = 1;
  private msgInFlight: number = 0;
  private msgQueue: shelly_rpc_msg_request_t[] = [];
  private responsesMap: Map<
    shelly_rpc_msg_request_id_t,
    shelly_transport_response_map_t
  > = new Map();
  private listeners: {
    [M in shelly_rpc_notification_method_t]: shelly_listener_t<M>[];
  } = {
    NotifyStatus: [],
    NotifyFullStatus: [],
    NotifyEvent: [],
  };
  private rpcDefaultOptions: Required<
    Pick<shelly_transport_rpc_options_t, 'timeout' | 'numberOfRetries'>
  > = {
    timeout: 5000,
    numberOfRetries: 3,
  };

  constructor(
    clientId: string,
    defaultOptions?: Partial<
      {
        requestsInFlight?: number;
      } & Pick<shelly_transport_rpc_options_t, 'timeout' | 'numberOfRetries'>
    >
  ) {
    this.clientId = clientId;

    this.rpcDefaultOptions.numberOfRetries =
      defaultOptions?.numberOfRetries ?? this.rpcDefaultOptions.numberOfRetries;
    this.rpcDefaultOptions.timeout =
      defaultOptions?.timeout ?? this.rpcDefaultOptions.timeout;
    this.requestsInFlight = Math.max(
      defaultOptions?.requestsInFlight ?? this.requestsInFlight,
      this.requestsInFlight
    );
  }

  async rpcRequest<K extends shelly_rpc_method_t>(
    method: K,
    params: shelly_rpc_method_params_t<K>,
    options?: Partial<shelly_transport_rpc_options_t>
  ): Promise<shelly_rpc_method_result_t<K>> {
    // Check if there is a matching request already in the queue
    for (const queuedRequest of this.msgQueue) {
      if (
        queuedRequest.method === method &&
        deepEqual(queuedRequest.params, params)
      ) {
        // Found matching request, return its promise
        const existingData = this.responsesMap.get(queuedRequest.id);
        if (existingData) {
          return new Promise<shelly_rpc_method_result_t<K>>(
            (resolve, reject) => {
              existingData.onResponse.push(resolve);
              existingData.onError.push(reject);
            }
          );
        }
      }
    }

    const msgId = this.msgCounter++;

    const responsePromise = new Promise<shelly_rpc_method_result_t<K>>(
      (resolve, reject) => {
        this.responsesMap.set(msgId, {
          onResponse: [resolve],
          onError: [reject],
          method,
          params,
          options: {
            timeout: options?.timeout ?? this.rpcDefaultOptions.timeout,
            numberOfRetries:
              options?.numberOfRetries ??
              this.rpcDefaultOptions.numberOfRetries,
            debounce: options?.debounce,
          },
        });
      }
    );

    const request: shelly_rpc_msg_request_t<K> = {
      jsonrpc: '2.0',
      id: msgId,
      src: this.clientId,
      method,
      params: params as shelly_rpc_method_params_t<K>,
      auth: options?.auth,
    };

    this.msgQueue.push(request);

    // new request added, process the queue
    this._handleQueue();

    return responsePromise;
  }

  receive(data: unknown): boolean {
    if (isRpcResponse(data)) {
      if (data.dst !== this.clientId) {
        return false;
      }

      if (this.responsesMap.has(data.id)) {
        const { onError, onResponse, method, timeoutId } =
          this.responsesMap.get(data.id)!;
        this.responsesMap.delete(data.id);
        clearTimeout(timeoutId);

        if (data.error) {
          onError.forEach(callback => callback(data.error));
        } else {
          const result = data.result as shelly_rpc_method_result_t<
            typeof method
          >;
          onResponse.forEach(callback => callback(result));
        }
      }

      // on message response, continue processing the queue
      this.msgInFlight--;
      this._handleQueue();
      return true;
    } else if (isRpcNotification(data)) {
      if (!this.listeners[data.method]) {
        return true; // no listeners for this method, ignore
      }

      if (data.method === 'NotifyEvent') {
        for (const listener of this.listeners[data.method]) {
          listener(data.params);
        }
      } else {
        for (const listener of this.listeners[data.method]) {
          listener(data.params);
        }
      }

      return true;
    }

    return false;
  }

  on<M extends shelly_rpc_notification_method_t>(
    method: M,
    listener: shelly_listener_t<M>
  ): void {
    this.listeners[method].push(listener);
  }

  off<M extends shelly_rpc_notification_method_t>(
    method: M,
    listener: shelly_listener_t<M>
  ): void {
    this.listeners[method] = this.listeners[method].filter(
      l => l !== listener
    ) as (typeof this.listeners)[M];
  }

  get ready(): Promise<void> {
    return Promise.resolve();
  }

  private _handleQueue(): void {
    if (
      this.msgQueue.length === 0 ||
      this.msgInFlight >= this.requestsInFlight
    ) {
      return;
    }

    const nextRequest = this.msgQueue[0];
    const reqData = this.responsesMap.get(nextRequest.id);
    if (!reqData) {
      return;
    }

    // If there's an active debounce timer for this request, don't do anything
    if (reqData.options.debounce && reqData.debounceTimeoutId !== undefined) {
      return;
    }

    // If this request has a debounce option and hasn't been debounced yet
    if (reqData.options.debounce && reqData.debounceTimeoutId === undefined) {
      reqData.debounceTimeoutId = setTimeout(() => {
        reqData.debounceTimeoutId = undefined;
        this._sendRequest();
      }, reqData.options.debounce);
      return;
    }

    // No debounce or timer expired, send immediately
    this._sendRequest();
  }

  private _sendRequest(): void {
    if (
      this.msgQueue.length === 0 ||
      this.msgInFlight >= this.requestsInFlight
    ) {
      return;
    }

    const request = this.msgQueue.shift()!;
    if (this._onSend(request) === false) {
      // if unable to send the request, add it back to the queue if retries are available
      const reqData = this.responsesMap.get(request.id);
      if (!reqData) {
        // no response data, cannot retry
        this._handleQueue();
        return;
      }
      reqData.options.numberOfRetries -= 1;
      if (reqData.options.numberOfRetries <= 0) {
        // no retries left, call onError handlers
        const error = new Error('Request failed after retries');
        reqData.onError.forEach(callback => callback(error));
        this.responsesMap.delete(request.id);
        clearTimeout(reqData.timeoutId);
        this._handleQueue();
        return;
      }
      // at the back of the queue
      this.msgQueue.push(request);
      this._handleQueue();
      return;
    }

    const reqData = this.responsesMap.get(request.id);
    if (reqData) {
      clearTimeout(reqData.timeoutId);
      reqData.timeoutId = setTimeout(() => {
        if (!this.responsesMap.has(request.id)) {
          return; // already handled
        }
        const error = new Error(`Request timed out with id=${request.id}`);
        reqData.onError.forEach(callback => callback(error));
        this.responsesMap.delete(request.id);
        this._handleQueue();
      }, reqData.options.timeout);
    }

    this.msgInFlight++;
    this._handleQueue();
  }

  protected abstract _onSend(req: shelly_rpc_msg_request_t<any>): boolean;
}
