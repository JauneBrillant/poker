import type { GameState } from "@common/types";

export type RootStackParamList = {
  Username: undefined;
  Home: undefined;
  Lobby: { lobbyName: string };
  Game: { lobbyName: string; initialGameState: GameState };
};
