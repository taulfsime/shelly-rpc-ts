import { MessageListener } from './MsgListeners';
import WebSocket from 'ws';

export class WebSocketTransport {
  private url: string;
  private socket: WebSocket | null = null;
  private reconnectAttempts = 0;
  private readonly maxReconnectAttempts = 10;
  private readonly reconnectTimeoutMs = 1000;
  private readonly msgListenersManager = new MessageListener<string>();

  constructor(url: string) {
    this.url = url;
  }

  connect(): Promise<void> {
    console.log('Connecting to WebSocket:', this.url);
    return new Promise((resolve, reject) => {
      this.socket = new WebSocket(this.url);

      this.socket.onopen = () => {
        this.reconnectAttempts = 0;
        console.log('WebSocket connected.');
        resolve();
      };

      this.socket.onerror = err => {
        console.error('WebSocket error:', err);
        this.handleReconnect(reject);
      };

      this.socket.onclose = () => {
        console.warn('WebSocket closed.');
        this.handleReconnect(reject);
      };

      this.socket.onmessage = event => {
        this.msgListenersManager.notifyListeners(event.data.toString());
      };
    });
  }

  addListener(callback: (msg: string) => void): void {
    this.msgListenersManager.addListener(callback);
  }

  sendMessage(msg: string): void {
    if (!this.isConnected) {
      console.warn('WebSocket is not connected or closed.');
      return;
    }

    this.socket?.send(msg);
  }

  close(): void {
    this.reconnectAttempts = this.maxReconnectAttempts;
    this.socket?.close();

    this.socket = null;
  }

  get connected(): Promise<void> {
    if (this.isConnected) {
      return Promise.resolve();
    }

    return this.connect();
  }

  get isConnected(): boolean {
    return Boolean(this.socket && this.socket?.readyState === WebSocket.OPEN);
  }

  private handleReconnect(reject: (reason?: any) => void) {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      reject(
        `Failed to reconnect after ${this.maxReconnectAttempts} attempts.`
      );
    }

    this.reconnectAttempts++;
    setTimeout(() => {
      console.log(`Reconnecting attempt ${this.reconnectAttempts}...`);
      this.connect().catch(reject);
    }, this.reconnectTimeoutMs);
  }
}
