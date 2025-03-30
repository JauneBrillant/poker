import type { Card as CardInterface } from "@common/types";

export class Card implements CardInterface {
  public suit: string;
  public rank: string;

  constructor(suit: string, rank: string) {
    this.suit = suit;
    this.rank = rank;
  }

  public toNumber(): number {
    const rank = this.rank;
    if (rank === "A") {
      return 14;
    }

    if (rank === "K") {
      return 13;
    }

    if (rank === "Q") {
      return 12;
    }

    if (rank === "J") {
      return 11;
    }

    return Number.parseInt(rank);
  }

  public toString(): string {
    return `${this.rank} of ${this.suit}`;
  }
}
