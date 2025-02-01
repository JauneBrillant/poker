import type { GameState } from "@common/types";

export type RootStackParamList = {
	Username: undefined;
	Home: undefined;
	Lobby: { lobbyId: string };
	Game: GameState;
};
