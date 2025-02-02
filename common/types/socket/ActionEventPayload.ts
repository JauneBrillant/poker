import type { PlayerAction } from "../poker/PlayerAction";

export interface ActionEventPayload {
	playerIndex: number;
	action: PlayerAction;
}
