import { Card } from "./Card";
import { Player } from "./Player";
import { Round } from "./Round";

export interface GameState {
  players: Player[];
  communityCards: Card[];
  round: Round;
  pot: number;
  activePlayer: number;
}
