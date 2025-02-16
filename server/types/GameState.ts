import type { GameState as CommonGameState } from "@common/types";
import type { Player } from "@models/Player";

export interface GameState extends CommonGameState {
  players: Player[];
}
