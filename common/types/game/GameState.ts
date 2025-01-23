import { Card, Player, Round } from "@common/types";

export interface GameState {
  players: Player[];
  communityCards: Card[];
  round: Round;
  pot: number;
  activePlayer: number;
}
