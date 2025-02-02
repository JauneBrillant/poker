import { Card } from "./Card";
import { Player } from "./Player";
import { Round } from "./Round";

export interface GameState {
  players: Player[];
  communityCards: Card[];
  currentRound: Round;
  mainPot: number;
  sidePot: number;
  currentBet: number;
  currentPlayerIndex: number;
  hasBetOccurred: boolean;
}
