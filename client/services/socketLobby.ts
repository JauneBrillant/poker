import { SocketEvent } from "@common/types";

export const joinLobby = (
	socket: SocketIOClient.Socket,
	lobbyId: string,
	playerName: string,
) => {
	socket.emit(SocketEvent.LOBBY_JOIN, { lobbyId, playerName });
};
