import { WebSocketServer, WebSocket } from 'ws';
import { ShellyRpc } from '../libs/ShellyRpc';
import { shelly_rpc_method_t, shelly_rpc_request_t } from '../types/ShellyRpc';

class ShellyRpcWs extends ShellyRpc {
  private ws: WebSocket;

  constructor(clientId: string, ws: WebSocket) {
    super(clientId);
    this.ws = ws;

    this.ws.on('message', message => {
      this.onMessageReceive(JSON.parse(message.toString()));
    });
  }

  onMessageSend<T extends shelly_rpc_method_t = any>(
    msg: shelly_rpc_request_t<T>
  ): void {
    this.ws.send(JSON.stringify(msg));
  }
}

export class ShellyWsServer {
  private wss: WebSocketServer;
  private clients: Map<string, ShellyRpcWs> = new Map();
  private serverId: string;

  constructor(port: number, serverId: string) {
    this.serverId = serverId;
    this.wss = new WebSocketServer({ port });

    this.wss.on('connection', async ws => {
      const client = new ShellyRpcWs(this.serverId, ws);

      await client.connected;
      const info = await client.rpcRequest('Shelly.GetDeviceInfo', {});

      this.clients.set(info.id, client);
      console.log(
        `connected new client ${info.name || info.app} with id ${info.id}`
      );
    });
  }

  sendMessage<T extends shelly_rpc_method_t = any>(
    deviceId: string,
    msg: shelly_rpc_request_t<T>
  ): void {
    if (!this.clients.has(deviceId)) {
      return;
    }

    this.clients.get(deviceId)!.onMessageSend(msg);
  }

  getClientIds(): string[] {
    return Array.from(this.clients.keys());
  }
}
