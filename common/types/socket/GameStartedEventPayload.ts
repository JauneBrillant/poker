import type { GameState } from "../poker/GameState";

export interface GameStartedEventPayload {
	initialGameState: GameState;
}
