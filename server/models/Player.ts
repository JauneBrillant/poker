import { Card, Player as PlayerInterface, TablePositions } from "@common/types";

export class Player implements PlayerInterface {
  public name: string;
  public position: TablePositions;
  public hand: Card[];
  public chips: number;
  public currentbetAmount: number;
  public isActive = true;

  constructor(name: string) {
    this.name = name;
  }

  public setCards(cards: Card[]): void {
    this.hand = cards;
  }

  public bet(amount: number): void {
    this.chips -= amount;
    this.currentbetAmount += amount;
  }

  public addChips(amount: number): void {
    this.chips += amount;
  }
}
