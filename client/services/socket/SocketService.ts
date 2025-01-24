import io from "socket.io-client";

class SocketService {
  private socket: SocketIOClient.Socket | null = null;

  public initializeSocket = (serverUrl: string) => {
    if (!this.socket) {
      this.socket = io(serverUrl);
    }
    return this.socket;
  };

  public getSocket = () => {
    if (!this.socket) {
      throw new Error("Socket not initialized");
    }
    return this.socket;
  };

  public disconnectSocket = () => {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  };
}

// singleton
export const socketService = new SocketService();
