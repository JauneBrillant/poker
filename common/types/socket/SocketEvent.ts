export enum SocketEvent {
  // lobby
  LOBBY_JOIN = "joinLobby",
  LOBBY_LEAVE = "leaveLobby",
  LOBBY_UPDATE = "updateLobby",
  // game
  GAME_START = "gameStart",
  GAME_STARTED = "gameStarted",
  GAME_RESTARTED = "gameRestarted",
  GAME_STATE_UPDATE = "gameStateUpdate",
  GAME_WINNER = "gameWinner",
  PLAYER_ACTION = "action",
}
