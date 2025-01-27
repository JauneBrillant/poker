import { PlayerAction } from "../game/PlayerAction";

export interface ActionEventPayload {
  playerIndex: number;
  action: PlayerAction;
}
