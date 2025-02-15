import { PlayerAction, Round } from "@common/types";
import { TablePosition } from "@common/types";
import type { GameState, Hand, Player as PlayerInterface } from "@common/types";
import { TablePositionArray } from "@common/types";
import type { Card } from "@models/Card";
import { PokerHandEvaluator } from "@services/PokerHandEvaluator";

export class Player implements PlayerInterface {
  private evaluator = new PokerHandEvaluator();
  public name: string;
  public hand: Hand;
  public position: TablePosition;
  public chips: number;
  public currentRoundBet: number;
  public isBtn: boolean;
  public isTurn: boolean;
  public isActionTakenThisRound: boolean;
  public isActive: boolean;
  public availableActions: PlayerAction[];

  constructor(index: number, name: string, cards: Card[], playersLen: number) {
    this.name = name;
    this.hand = this.evaluator.evaluate(cards, true, undefined);
    this.chips = 1000;
    this.currentRoundBet = 0;
    this.isBtn = index === 0;
    this.isActionTakenThisRound = false;
    this.isActive = true;
    this.availableActions = [];

    this.assignPositionAndTurn(index, playersLen);
  }

  private assignPositionAndTurn(index: number, playersLen: number): void {
    if (playersLen === 2) {
      this.position = index === 0 ? TablePosition.SB : TablePosition.BB;
      this.isTurn = index === 0;
    } else if (playersLen === 3) {
      this.position =
        index === 0 ? TablePosition.SB : index === 1 ? TablePosition.BB : TablePosition.UTG;
      this.isTurn = index === 2;
    } else {
      this.position = TablePositionArray[index];
      this.isTurn = index === 3;
    }
  }

  public bet(amount: number): void {
    this.chips -= amount;
    this.currentRoundBet += amount;
  }

  public addChips(amount: number): void {
    this.chips += amount;
  }

  public setAvailableAction(gameState: GameState): void {
    this.availableActions = [];

    if (!this.isActive || this.chips <= 0) {
      return;
    }

    this.availableActions.push(PlayerAction.FOLD);

    if (gameState.currentRound === Round.PRE_FLOP) {
      const opponents = gameState.players.filter((p) => p.name !== this.name);
      if (opponents.every((p) => p.isActionTakenThisRound) && !this.isActionTakenThisRound) {
        this.availableActions.push(PlayerAction.CHECK);
      }
    }

    if (gameState.hasBetOccurred) {
      const callAmount = gameState.maxBetThisRound - this.currentRoundBet;
      if (this.chips >= callAmount && callAmount !== 0) {
        this.availableActions.push(PlayerAction.CALL);
      }
      this.availableActions.push(PlayerAction.RAISE);
    } else {
      this.availableActions.push(PlayerAction.BET, PlayerAction.CHECK);
    }

    if (this.availableActions.includes(PlayerAction.CHECK)) {
      this.availableActions = this.availableActions.filter(
        (action) => action !== PlayerAction.FOLD,
      );
    }
  }

  public updateHandInfo(communityCards: Card[]): void {
    this.hand = this.evaluator.evaluate(this.hand.cards as Card[], false, communityCards);
  }
}
