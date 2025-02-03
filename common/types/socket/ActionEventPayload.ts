import type { PlayerAction } from "../poker/PlayerAction";

export interface ActionEventPayload {
	lobbyId: string;
	action: PlayerAction;
	betAmount?: number;
	raiseAmount?: number;
}
