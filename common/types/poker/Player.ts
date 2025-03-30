import type { Hand } from "./Hand";
import type { PlayerAction } from "./PlayerAction";
import type { TablePosition } from "./TablePosition";

export interface Player {
  name: string;
  hand: Hand;
  position: TablePosition;
  chips: number;
  currentRoundBet: number;
  isBtn: boolean;
  isTurn: boolean;
  isActionTakenThisRound: boolean;
  isActive: boolean;
  availableActions: PlayerAction[];
}
