import { Card } from "./Card";
import { TablePosition } from "./TablePosition";
import { PlayerAction } from "./PlayerAction";

export interface Player {
  id: string;
  name: string;
  hand: Card[];
  position: TablePosition;
  chips: number;
  currentBet: number;
  isActive: boolean;
  availableActions: PlayerAction[];
}
