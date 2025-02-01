import { PlayerAction } from "../poker/PlayerAction";

export interface ActionEventPayload {
  playerIndex: number;
  action: PlayerAction;
}
