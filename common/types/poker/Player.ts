import type { Hand } from "./Hand";
import type { PlayerAction } from "./PlayerAction";
import type { TablePosition } from "./TablePosition";

export interface Player {
  name: string;
  hand: Hand;
  position: TablePosition;
  chips: number;
  currentBet: number;
  isTurn: boolean;
  isActive: boolean;
  availableActions: PlayerAction[];
}
