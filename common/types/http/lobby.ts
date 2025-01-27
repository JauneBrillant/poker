import { Player } from "../game/Player";

export interface Lobby {
  lobbyId: string;
  players?: Player[];
}
