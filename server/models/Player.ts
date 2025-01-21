import { Card } from "@common/Card";
import { Player as PlayerInterface } from "@common/Player";

export class Player implements PlayerInterface {
  public name: string;
  public hand: Card[];
  public chips: number;

  constructor(name: string) {
    this.name = name;
  }

  public setCards(cards: Card[]): void {
    this.hand = cards;
  }

  public bet(amount: number): void {
    this.chips -= amount;
  }

  public addChips(amount: number): void {
    this.chips += amount;
  }
}
