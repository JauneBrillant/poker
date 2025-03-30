export enum SocketEvent {
  // lobby
  LOBBY_CREATE = "createLobby",
  LOBBY_CREATE_SUCCESS = "createLobbySuccess",
  LOBBY_CREATE_FAILED = "createLobbyFailed",
  LOBBY_JOIN = "joinLobby",
  LOBBY_JOIN_SUCCESS = "joinLobbySuccess",
  LOBBY_JOIN_FAILED = "joinLobbyFailed",
  LOBBY_LEAVE = "leaveLobby",
  LOBBY_DELETE = "deleteLobby",
  LOBBY_UPDATE = "updateLobby",
  // game
  GAME_START = "gameStart",
  GAME_STARTED = "gameStarted",
  GAME_RESTARTED = "gameRestarted",
  GAME_STATE_UPDATE = "gameStateUpdate",
  GAME_WINNER = "gameWinner",
  PLAYER_ACTION = "action",
}
