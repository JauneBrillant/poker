import type {
	ActionEventPayload,
	GameStartEventPayload,
	Lobby,
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

				this.io.to(lobbyId).emit(SocketEvent.LOBBY_UPDATE, { updatedPlayers });
			});

			socket.on(
				SocketEvent.GAME_START,
				({ lobbyId, players }: GameStartEventPayload) => {
					console.log("game start event listening");
					console.log(`lobbyId: ${lobbyId}  players: ${players}`);
					this.game = new PokerGame(players);
					this.io
						.to(lobbyId)
						.emit(SocketEvent.GAME_STARTED, { gameState: this.game.state });
				},
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

	private handleStartGame(lobby: Lobby): void {}

	private handleAction(payload: ActionEventPayload) {
		this.game.processAction(payload.playerIndex, payload.action);
	}

	private handleUpdateClients(): void {
		this.io.emit("gameStateUpdated", this.game.state);
	}
}
