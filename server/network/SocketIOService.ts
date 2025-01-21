import { Server, Socket } from "socket.io";
import { Card } from "@common/Card";
import { GameManager } from "../services/GameManager";
import { HandEvaluator } from "../services/HandEvaluator";

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

      // クライアントに初期状態を送信
      socket.emit("initialState", this.gameManager.getGameState());

      // ゲーム開始イベント
      socket.on("startGame", () => this.handleStartGame());

      // ゲーム状態更新イベント
      socket.on("gameStateUpdate", () => this.updateClients());

      // 役判定イベント
      socket.on(
        "evaluateHand",
        (cards: { suit: string; rank: string }[], callback) => {
          this.handleEvaluateHand(cards, callback);
        }
      );

      // クライアントが切断したときの処理
      socket.on("disconnect", () => {
        console.log("クライアントが切断しました");
      });
    });
  }

  private handleStartGame(): void {
    console.log("ゲームを開始します");
    this.gameManager.startGame();
    this.io.emit("gameStarted", this.gameManager.getGameState());
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
