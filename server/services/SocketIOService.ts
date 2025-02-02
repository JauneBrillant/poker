import type {
	ActionEventPayload,
	Lobby,
	LobbyUpdateEventPayload,
} from "@common/types";
import { SocketEvent } from "@common/types";
import { LobbyManager } from "@services/LobbyManager";
import { PokerGame } from "@services/PokerGame";
import type { Server, Socket } from "socket.io";

export class SocketIOService {
	private io: Server;
	private game: PokerGame;

	constructor(server: Server, game: PokerGame) {
		this.io = server;
		this.game = game;
	}

	public init(): void {
		this.io.on("connection", (socket: Socket) => {
			console.log("user connected");

			socket.on(SocketEvent.LOBBY_JOIN, ({ lobbyId, playerName }) => {
				socket.join(lobbyId);
				LobbyManager.getInstance().joinLobby(lobbyId, playerName);

				const updatedPlayers =
					LobbyManager.getInstance().getLobby(lobbyId)?.players || [];

				this.io.to(lobbyId).emit(SocketEvent.LOBBY_UPDATE, {
					lobbyId,
					updatedPlayers,
				} as LobbyUpdateEventPayload);
			});

			socket.on(SocketEvent.GAME_START, (payload) =>
				this.handleStartGame(payload),
			);
			socket.on(SocketEvent.ACTION, (payload) => {
				this.handleAction(payload);
			});
			socket.on(SocketEvent.GAME_STATE_UPDATE, () =>
				this.handleUpdateClients(),
			);

			socket.on("disconnect", () => {
				console.log("user disconnected");
			});
		});
	}

	private handleStartGame(lobby: Lobby): void {
		console.log("game started");
		this.game = new PokerGame(lobby);
		this.io.emit(SocketEvent.GAME_START, this.game.state);
	}

	private handleAction(payload: ActionEventPayload) {
		this.game.processAction(payload.playerIndex, payload.action);
	}

	private handleUpdateClients(): void {
		this.io.emit("gameStateUpdated", this.game.state);
	}
}
