import "tsconfig-paths/register";
import http from "node:http";
import type { PokerGame } from "@services/PokerGame";
import { SocketIOService } from "@services/SocketIOService";
import express from "express";
import { Server } from "socket.io";

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
const game: PokerGame | null = null;

// SocketIOServerの初期化
const socketIOService = new SocketIOService(io, game);
socketIOService.init();

// ルーティングの設定
app.use(express.json());
app.use("/api", lobbyRoutes);

server.listen(3000, () => {
	console.log("the server has started on port 3000");
});
