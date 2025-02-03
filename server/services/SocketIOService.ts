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
	private games = new Map<string, PokerGame>();
	private io: Server;

	constructor(server: Server) {
		this.io = server;
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
					const newGame = new PokerGame(players);
					this.games.set(lobbyId, newGame);
					this.io.to(lobbyId).emit(SocketEvent.GAME_STARTED, {
						initialGameState: newGame.state,
					});
				},
			);

			socket.on(
				SocketEvent.PLAYER_ACTION,
				({ lobbyId, action, betAmount, raiseAmount }) => {
					console.log(lobbyId, action, betAmount, raiseAmount);
					const game = this.games.get(lobbyId);
					game.processAction(action, betAmount, raiseAmount);
					this.io.to(lobbyId).emit(SocketEvent.GAME_STATE_UPDATE, game.state);
				},
			);

			socket.on("disconnect", () => {
				console.log("user disconnected");
			});
		});
	}
}
