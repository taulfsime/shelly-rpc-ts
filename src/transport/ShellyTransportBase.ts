import {
  isRpcNotification,
  isRpcResponse,
  shelly_rpc_method_params_t,
  shelly_rpc_method_result_t,
  shelly_rpc_method_t,
  shelly_rpc_msg_request_id_t,
  shelly_rpc_msg_request_t,
  shelly_rpc_notification_method_t,
  shelly_rpc_notification_t,
} from '../ShellyRpc.js';

const SHELLY_LIMIT_REQUESTS_IN_FLIGHT = 1;

type shelly_listener_t = (msg: shelly_rpc_notification_t['params']) => void;

type shelly_transport_response_map_t = {
  method: shelly_rpc_method_t;
  onResponse: (result: any) => void;
  onError: (error: any) => void; //XXX: types!!!
  options: {
    timeout: number;
    numberOfRetries: number;
  };
  timeoutId?: number;
};

export abstract class ShellyTransportBase {
  private readonly clientId: string;
  private msgCounter: number = 1;
  private msgInFlight: number = 0;
  private msgQueue: shelly_rpc_msg_request_t[] = [];
  private responsesMap: Map<
    shelly_rpc_msg_request_id_t,
    shelly_transport_response_map_t
  > = new Map();
  private listeners: {
    [K in shelly_rpc_notification_method_t]: shelly_listener_t[];
  } = {
    NotifyStatus: [],
    NotifyFullStatus: [],
    NotifyEvent: [],
  };

  constructor(clientId: string) {
    this.clientId = clientId;
  }

  async rpcRequest<K extends shelly_rpc_method_t>(
    method: K,
    params: shelly_rpc_method_params_t<K>,
    options?: Partial<shelly_transport_response_map_t['options']>
  ): Promise<shelly_rpc_method_result_t<K>> {
    const msgId = this.msgCounter++;

    const responsePromise = new Promise<shelly_rpc_method_result_t<K>>(
      (resolve, reject) => {
        this.responsesMap.set(msgId, {
          onResponse: resolve,
          onError: reject,
          method,
          options: {
            timeout: options?.timeout ?? 5000,
            numberOfRetries: options?.numberOfRetries ?? 3,
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
          onError(data.error);
        } else {
          onResponse(data.result as shelly_rpc_method_result_t<typeof method>);
        }
      }

      // on message response, continue processing the queue
      this.msgInFlight--;
      this._handleQueue();
      return true;
    } else if (isRpcNotification(data)) {
      if (this.listeners[data.method]) {
        for (const listener of this.listeners[data.method]) {
          listener(data.params as shelly_rpc_notification_t['params']);
        }
      }
      return true;
    }

    return false;
  }

  on(
    method: shelly_rpc_notification_method_t,
    listener: shelly_listener_t
  ): void {
    this.listeners[method].push(listener);
  }

  off(
    method: shelly_rpc_notification_method_t,
    listener: shelly_listener_t
  ): void {
    this.listeners[method] = this.listeners[method].filter(l => l !== listener);
  }

  get ready(): Promise<void> {
    return Promise.resolve();
  }

  _handleQueue(): void {
    if (
      this.msgQueue.length === 0 ||
      this.msgInFlight >= SHELLY_LIMIT_REQUESTS_IN_FLIGHT
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
        // no retries left, call onError //XXX: error type!!!
        reqData.onError(new Error('Request failed after retries'));
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

        reqData.onError(new Error('Request timed out'));
        this.responsesMap.delete(request.id);
        this._handleQueue();
      }, reqData.options.timeout);
    }

    this.msgInFlight++;
    this._handleQueue();
  }

  abstract _onSend(req: shelly_rpc_msg_request_t<any>): boolean;
}
