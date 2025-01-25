import { Card } from "@common/types";
import { TablePositions } from "@common/types";

export interface Player {
  name: string;
  position: TablePositions;
  hand: Card[];
  chips: number;
  currentbetAmount: number;
  isActive: boolean;
}
