import WebSocket from 'ws';

export class WebSocketTransport {
  private url: string;
  private socket: WebSocket | null = null;
  private reconnectAttempts = 0;
  private readonly maxReconnectAttempts = 10;
  private readonly reconnectTimeoutMs = 1000;
  private connectingPromise: Promise<void> | null = null;
  private onIncomingData: (msg: string) => void;

  constructor(url: string, onIncomingData: (msg: string) => void) {
    this.url = url;
    this.onIncomingData = onIncomingData;
  }

  connect(): Promise<void> {
    if (this.connectingPromise) {
      return this.connectingPromise;
    }

    console.log('Connecting to WebSocket:', this.url);
    this.connectingPromise = new Promise((resolve, reject) => {
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
        this.onIncomingData(event.data.toString());
      };
    });

    return this.connectingPromise;
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
