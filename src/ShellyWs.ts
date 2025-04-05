import { ShellyRpc } from './libs/ShellyRpc';
import { shelly_rpc_request_t } from './types/ShellyRpc';
import { WebSocketTransport } from './libs/WebSocketTransport';

export class ShellyWs extends ShellyRpc {
  private ip: string;
  private transport: WebSocketTransport;

  constructor(ip: string, clientId?: string) {
    super(clientId || `shelly-rpc-${Math.round(Math.random() % 99)}`);
    this.ip = ip;
    this.transport = new WebSocketTransport(`ws://${ip}/rpc`);

    this.transport.addListener(msg => {
      this.onMessageReceive(JSON.parse(msg));
    });
  }

  protected onMessageSend(msg: shelly_rpc_request_t<any>): void {
    this.transport.sendMessage(JSON.stringify(msg));
  }

  get connected(): Promise<void> {
    return this.transport.connected;
  }
}
