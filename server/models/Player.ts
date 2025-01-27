import {
  Card,
  Player as PlayerInterface,
  TablePosition,
  PlayerAction,
} from "@common/types";
import { GameState } from "@common/types";

export class Player implements PlayerInterface {
  public id: string;
  public name: string;
  public hand: Card[];
  public position: TablePosition;
  public chips: number;
  public currentBet: number;
  public isActive = true;
  public availableActions: PlayerAction[];

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  public bet(amount: number): void {
    this.chips -= amount;
    this.currentBet += amount;
  }

  public addChips(amount: number): void {
    this.chips += amount;
  }

  public getAvailableActions = (gameState: GameState) => {
    const actions = [PlayerAction.FOLD];

    // fold済み
    if (!this.isActive) {
      return [];
    }

    if (this.chips <= 0) {
      return [PlayerAction.ALL_IN];
    }

    if (!gameState.hasBetOccurred) {
      actions.push(PlayerAction.CHECK, PlayerAction.BET);
    } else {
      const callAmount = gameState.currentBet - this.currentBet;
      if (this.chips >= callAmount) {
        actions.push(PlayerAction.CALL);
      } else {
        actions.push(PlayerAction.ALL_IN); // コール額を満たせないとき
      }

      actions.push(PlayerAction.RAISE);
    }

    return actions;
  };
}
