import { Server, Socket } from "socket.io";
import { Card, SocketEvent, Lobby, ActionEventPayload } from "@common/types";
import { PokerGame, HandEvaluator } from "@services/game";

export class SocketIOService {
  private io: Server;
  private game: PokerGame;

  constructor(server: Server, game: PokerGame) {
    this.io = server;
    this.game;
  }

  public init(): void {
    this.io.on("connection", (socket: Socket) => {
      console.log("クライアントが接続しました");

      socket.on(SocketEvent.GAME_START, (payload) =>
        this.handleStartGame(payload)
      );
      socket.on(SocketEvent.ACTION, (payload) => {
        this.handleAction(payload);
      });
      socket.on(SocketEvent.GAME_STATE_UPDATE, () =>
        this.handleUpdateClients()
      );

      socket.on("disconnect", () => {
        console.log("クライアントが切断しました");
      });
    });
  }

  private handleStartGame(lobby: Lobby): void {
    console.log("ゲームを開始します");
    this.game = new PokerGame(lobby);
    this.io.emit(SocketEvent.GAME_START, this.game.state);
  }

  private handleAction(payload: ActionEventPayload) {
    this.game.processAction(payload.playerIndex, payload.action);
  }

  // private handleEvaluateHand(
  //   cards: { suit: string; rank: string }[],
  //   callback: Function
  // ): void {
  //   console.log("役を判定します");
  //   const cardsInstance = cards.map((card) => new Card(card.suit, card.rank));
  //   const result = HandEvaluator.evaluate(cardsInstance);
  //   callback(result);
  // }

  private handleUpdateClients(): void {
    this.io.emit("gameStateUpdated", this.game.state);
  }
}
