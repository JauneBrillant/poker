import "tsconfig-paths/register";

import express from "express";
import http from "http";
import { Server } from "socket.io";

import { Player } from "@models";
import { SocketIOService } from "@services/socket";
import { GameManager } from "@services/game";

import lobbyRoutes from "@routes/lobbyRoutes";

// Express, Socket.IOの初期化
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // 開発時のみ。本番環境では適切なオリジンを指定
    methods: ["GET", "POST"],
  },
});

// ゲームの初期化
const player = [new Player("Alice"), new Player("Bob")];
const gameManager = new GameManager(player);

// SocketIOServerの初期化
const socketIOService = new SocketIOService(io, gameManager);
socketIOService.init();

// ルーティングの設定
app.use(express.json());
app.use("/api", lobbyRoutes);

server.listen(3000, () => {
  console.log("サーバーがポート3000で起動しました");
});
