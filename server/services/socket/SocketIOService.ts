import { Server, Socket } from "socket.io";
import { Card, SocketEvents } from "@common/types";
import { GameManager, HandEvaluator } from "@services/game";

export class SocketIOService {
  private io: Server;
  private gameManager: GameManager;

  constructor(server: Server, gameManager: GameManager) {
    this.io = server;
    this.gameManager = gameManager;
  }

  public init(): void {
    this.io.on("connection", (socket: Socket) => {
      console.log("A client connected");

      socket.on(SocketEvents.GAME_START, () => this.handleStartGame());
      socket.on(SocketEvents.GAME_STATE_UPDATE, () => this.updateClients());
      socket.on(
        SocketEvents.EVALUATE_HAND,
        (cards: { suit: string; rank: string }[], callback) => {
          this.handleEvaluateHand(cards, callback);
        }
      );

      socket.on("disconnect", () => {
        console.log("クライアントが切断しました");
      });
    });
  }

  private handleStartGame(): void {
    console.log("ゲームを開始します");
    this.gameManager.startGame();
    this.io.emit(SocketEvents.GAME_START, this.gameManager.getGameState());
  }

  private handleEvaluateHand(
    cards: { suit: string; rank: string }[],
    callback: Function
  ): void {
    console.log("役を判定します");
    const cardsInstance = cards.map((card) => new Card(card.suit, card.rank));
    const result = HandEvaluator.evaluate(cardsInstance);
    callback(result);
  }

  private updateClients(): void {
    this.io.emit("gameStateUpdated", this.gameManager.getGameState());
  }
}
