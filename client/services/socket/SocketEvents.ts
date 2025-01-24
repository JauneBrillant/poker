import { socketService } from "@services/socket";
import { GameState, SocketEvents } from "@common/types";

export const startGame = () => {
  const socket = socketService.getSocket();
  socket.emit(SocketEvents.GAME_START);
};

export const listenToGameStart = (callback: (gameState: GameState) => void) => {
  const socket = socketService.getSocket();
  socket.on(SocketEvents.GAME_START, (gameState: GameState) => {
    callback(gameState);
  });
};

export const listenToGameStateUpdate = (
  callback: (gameState: GameState) => void
) => {
  const socket = socketService.getSocket();
  socket.on(SocketEvents.GAME_STATE_UPDATE, (gameState: GameState) => {
    callback(gameState);
  });
};
