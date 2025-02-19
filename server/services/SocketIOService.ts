import type { GameStartEventPayload } from "@common/types";
import { SocketEvent } from "@common/types";
import { LobbyManager } from "@services/LobbyManager";
import { PokerGame } from "@services/PokerGame";
import type { Server, Socket } from "socket.io";

export class SocketIOService {
  private games = new Map<string, PokerGame>();
  private lobbyManager = new LobbyManager();
  private io: Server;

  constructor(server: Server) {
    this.io = server;
  }

  public init(): void {
    this.io.on("connection", (socket: Socket) => {
      console.log("user connected");

      socket.on(SocketEvent.LOBBY_CREATE, async (hostname: string) => {
        try {
          const lobbyName = hostname;
          await this.lobbyManager.createLobby(lobbyName);
          socket.join(lobbyName);
          socket.emit(SocketEvent.LOBBY_CREATE_SUCCESS);
          this.io.to(lobbyName).emit(SocketEvent.LOBBY_UPDATE, [hostname]);
        } catch (error) {
          socket.emit(SocketEvent.LOBBY_CREATE_FAILED);
        }
      });

      socket.on(SocketEvent.LOBBY_JOIN, async (lobbyName: string, username: string) => {
        try {
          const lobbyMembers = await this.lobbyManager.joinLobby(lobbyName, username);
          if (!lobbyMembers) {
            socket.emit(SocketEvent.LOBBY_JOIN_FAILED);
            return;
          }
          socket.join(lobbyName);
          socket.emit(SocketEvent.LOBBY_JOIN_SUCCESS);
          this.io.to(lobbyName).emit(SocketEvent.LOBBY_UPDATE, lobbyMembers);
        } catch (error) {
          socket.emit(SocketEvent.LOBBY_JOIN_FAILED);
        }
      });

      socket.on(SocketEvent.LOBBY_LEAVE, async (lobbyName, userName) => {
        try {
          if (lobbyName === userName) {
            await this.lobbyManager.deleteLobby(lobbyName);
            this.io.to(lobbyName).emit(SocketEvent.LOBBY_DELETE);
          } else {
            const restLobbyMembers = await this.lobbyManager.leaveLobby(lobbyName, userName);
            this.io.to(lobbyName).emit(SocketEvent.LOBBY_UPDATE, restLobbyMembers);
          }
        } catch (error) {}
      });

      socket.on(SocketEvent.GAME_START, ({ lobbyId, players }: GameStartEventPayload) => {
        const pokerGame = new PokerGame(players, lobbyId);
        this.games.set(lobbyId, pokerGame);
        this.io.to(lobbyId).emit(SocketEvent.GAME_STARTED, {
          initialGameState: pokerGame.state,
        });

        pokerGame.on(SocketEvent.GAME_WINNER, (winnerName, lobbyId) => {
          this.io.to(lobbyId).emit(SocketEvent.GAME_WINNER, winnerName);
        });

        pokerGame.on(SocketEvent.GAME_RESTARTED, (gameState, lobbyId) => {
          this.io.to(lobbyId).emit(SocketEvent.GAME_STATE_UPDATE, gameState);
        });
      });

      socket.on(SocketEvent.PLAYER_ACTION, ({ lobbyId, action, betAmount, raiseAmount }) => {
        const game = this.games.get(lobbyId);
        game.processAction(action, betAmount, raiseAmount);
        this.io.to(lobbyId).emit(SocketEvent.GAME_STATE_UPDATE, game.state);
      });

      socket.on(SocketEvent.GAME_WINNER, (lobbyId: string, winnerName: string) => {
        this.io.to(lobbyId).emit(SocketEvent.GAME_WINNER, { lobbyId, winnerName });
      });

      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
    });
  }
}
