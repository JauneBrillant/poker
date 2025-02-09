import type { Card } from "./Card";
import type { Player } from "./Player";
import type { Round } from "./Round";

export interface GameState {
  players: Player[];
  communityCards: Card[];
  currentRound: Round;
  mainPot: number;
  sidePot: number;
  maxBetThisRound: number;
  currentPlayerIndex: number;
  hasBetOccurred: boolean;
}
