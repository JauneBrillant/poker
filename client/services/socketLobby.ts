import { SocketEvent } from "@common/types";

export const joinLobby = (socket: SocketIOClient.Socket | null, lobbyId: string, playerName: string) => {
  if (!socket) {
    throw new Error("Socket connection not available");
  }
  socket.emit(SocketEvent.LOBBY_JOIN, { lobbyId, playerName });
};
