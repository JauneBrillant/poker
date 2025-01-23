export class Card {
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

    return parseInt(rank);
  }

  public toString(): string {
    return `${this.rank} of ${this.suit}`;
  }
}
