import { WebSocketTransport } from './WebSocketTransport';
import { MessageListener } from './MsgListeners';

type msg_out_t = {
  id: number;
  src: string;
  method: string;
  params?: Record<string, any>;
};

type notif_t = {
  method: 'NotifyStatus' | 'NotifyEvent';
  params?: Record<string, any>;
};

export class ShellyRpc {
  private ip: string;
  private clientId: string;
  private readonly transport: WebSocketTransport;
  private callbacksQueue = new Map<
    number,
    { reject: (reason?: any) => void; resolve: (value?: any) => void }
  >([]);
  private messageQueue: msg_out_t[] = [];
  private nextMessageId = 1;
  private connectedPromise: Promise<void>;
  private messagesInFlight = 0;
  private readonly listenersManager = new MessageListener<notif_t>();

  constructor(ip: string, clientId?: string) {
    this.ip = ip;
    this.transport = new WebSocketTransport(`ws://${this.ip}/rpc`);
    this.clientId = clientId || crypto.randomUUID();

    this.transport.addListener((msg: string) => this.onMessage(msg));

    this.connectedPromise = this.transport.connect();
    this.connectedPromise.then(() => {
      this.processMessageQueue();
    });
  }

  rpcRequest<T = any | null>(
    method: string,
    params?: Record<string, any>
  ): Promise<T> {
    const id = this.nextMessageId++;
    method = method.toLowerCase();

    const promise = new Promise<T>((resolve, reject) => {
      this.callbacksQueue.set(id, { resolve, reject });
    });

    const msg: msg_out_t = {
      id,
      src: this.clientId,
      method,
      params,
    };

    this.messageQueue.push(msg);
    this.processMessageQueue();

    // this.transport.sendMessage(JSON.stringify(msg));
    //TODO: (k.todorov) add timeout

    return promise;
  }

  connected(): Promise<void> {
    return this.connectedPromise;
  }

  addNotificationListener(listener: (notif: notif_t) => void): void {
    this.listenersManager.addListener(listener);
  }

  // {"src":"shellyi4g3-54320455c858","dst":"ee390919-eb15-4b0d-acdc-226faa31afe4","method":"NotifyEvent","params":{"ts":1735821119.25,"events":[{"component":"sys","event":"config_changed","restart_required":false,"ts":1735821119.25,"cfg_rev":20}]}}	1735821119.3472958
  // {"src":"shellyi4g3-54320455c858","dst":"ee390919-eb15-4b0d-acdc-226faa31afe4","method":"NotifyStatus","params":{"ts":1735821119.25,"sys":{"cfg_rev":20}}}	1735821119.3482728

  private onMessage(msgRaw: string): void {
    const msg = JSON.parse(msgRaw) as {
      id: number;
      dst: string;
      result?: any;
      error?: any;
      method?: string;
      params?: Record<string, any>;
    };

    if (msg.dst !== this.clientId) {
      console.warn('Received message from unknown client:', msg);
      return;
    }

    switch (msg.method) {
      case 'NotifyEvent':
        return this.listenersManager.notifyListeners({
          method: 'NotifyEvent',
          params: msg.params,
        });
      case 'NotifyStatus':
        return this.listenersManager.notifyListeners({
          method: 'NotifyStatus',
          params: msg.params,
        });
      default:
        break;
    }

    const callback = this.callbacksQueue.get(msg.id);
    if (!callback) {
      console.warn('Received response for unknown message:', msg);
      return;
    }

    if (msg.error) {
      callback.reject(msg.error);
    } else {
      callback.resolve(msg.result);
    }
    this.callbacksQueue.delete(msg.id);

    this.messagesInFlight--;
    this.processMessageQueue();
  }

  private processMessageQueue(): void {
    const msg = this.messageQueue.shift();
    if (!msg) {
      return;
    }

    if (this.messagesInFlight > 1) {
      return;
    }

    this.transport.sendMessage(JSON.stringify(msg));
    this.messagesInFlight++;
    // TODO: (k.todorov) add timeout
  }
}
