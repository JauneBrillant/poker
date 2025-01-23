import { Card } from "@common/types";

export interface Player {
  name: string;
  hand: Card[];
  chips: number;
}
