import express from "express";
import http from "http";
import { Server } from "socket.io";

import { Card } from "@common/Card";
import { HandEvaluator } from "./services/HandEvaluator";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // 開発時のみ。本番環境では適切なオリジンを指定
    methods: ["GET", "POST"],
  },
});

io.on("connect", (socket) => {
  console.log("クライアントが接続しました");

  socket.on(
    "evaluateHand",
    (cards: { suit: string; rank: string }[], callback) => {
      console.log("役を判定します");
      const cardsInstance: Card[] = cards.map(
        (card) => new Card(card.suit, card.rank)
      );
      const result = HandEvaluator.evaluate(cardsInstance);
      callback(result);
    }
  );

  socket.on("disconnect", () => {
    console.log("クライアントが切断しました");
  });
});

server.listen(3000, () => {
  console.log("サーバーがポート3000で起動しました");
});
