import {
  shelly_rpc_method_params_t,
  shelly_rpc_method_response_t,
  shelly_rpc_method_result_t,
  shelly_rpc_method_t,
  shelly_rpc_notification_event_t,
  shelly_rpc_notification_status_t,
  shelly_rpc_request_id_t,
  shelly_rpc_request_t,
} from '../types/ShellyRpc';

export class ShellyRpc {
  private clientId: string;
  private msgCounter: number = 1;
  private requestQueue: {
    params: shelly_rpc_request_t<any>;
    resolve: (response: shelly_rpc_method_result_t<any>) => void;
    reject: (code: number, message: string) => void;
  }[] = [];
  private responseQueue: Map<
    shelly_rpc_request_id_t,
    (response: shelly_rpc_method_response_t<any>) => void
  > = new Map();

  constructor(clientId: string) {
    this.clientId = clientId;
  }

  async rpcRequest<T extends shelly_rpc_method_t = any>(
    method: T,
    params: shelly_rpc_method_params_t<T>
  ): Promise<shelly_rpc_method_result_t<T>> {
    await this.connected;

    const id = this.msgCounter++;
    const requestParams: shelly_rpc_request_t<T> = {
      jsonrpc: '2.0',
      id,
      method,
      params,
      src: this.clientId,
    };

    const responsePromise = new Promise<shelly_rpc_method_result_t<T>>(
      (resolve, reject) => {
        this.requestQueue.push({
          params: requestParams,
          resolve,
          reject,
        });
        this.processRequestQueue();
      }
    );

    return responsePromise;
  }

  protected onMessageReceive(
    msg:
      | shelly_rpc_notification_status_t
      | shelly_rpc_notification_event_t
      | shelly_rpc_method_response_t<any>
  ): void {
    if (
      'id' in msg &&
      msg.dst === this.clientId &&
      this.responseQueue.has(msg.id)
    ) {
      const callback = this.responseQueue.get(msg.id);
      this.responseQueue.delete(msg.id);

      if (typeof callback === 'function') {
        callback(msg);
      }
    }
  }

  protected onMessageSend(msg: shelly_rpc_request_t<any>): void {
    return; // dummy implementation
  }

  get connected(): Promise<void> {
    return Promise.resolve(); // dummy implementation, always connected
  }

  private processRequestQueue(): void {
    // always have 1 request in flight at a time
    if (this.responseQueue.size > 1) {
      return;
    }

    const msg = this.requestQueue.shift();
    if (!msg) {
      return;
    }

    this.responseQueue.set(
      msg.params.id,
      (msgContent: shelly_rpc_method_response_t<any>) => {
        if ('error' in msgContent) {
          msg.reject(msgContent.error.code, msgContent.error.message);
          return;
        }

        if ('result' in msgContent) {
          msg.resolve(msgContent.result);
        }

        this.processRequestQueue();
      }
    );

    this.onMessageSend(msg.params);
    // TODO: (k.todorov) add timeout
  }
}
