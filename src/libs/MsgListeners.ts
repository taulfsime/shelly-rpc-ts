export class MessageListener<T = any> {
  private listeners: ((msg: T) => void)[] = [];

  addListener(callback: (msg: T) => void): void {
    this.listeners.push(callback);
  }

  notifyListeners(msg: T): void {
    for (const listener of this.listeners) {
      listener(msg);
    }
  }

  removeListener(callback: (msg: T) => void): void {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }
}
