import { Card } from "@common/Card";
import { HandRank } from "@common/HandRank";
import { HandEvaluationResponse } from "@common/HandEvaluationResponse";

export class HandEvaluator {
  public static evaluate(cards: Card[]): HandEvaluationResponse {
    if (this.royalFlush(cards)) {
      return { rank: "ロイヤルフラッシュ", strength: HandRank.ROYAL_FLUSH };
    }

    if (this.straightFlush(cards)) {
      return {
        rank: "ストレートフラッシュ",
        strength: HandRank.STRAIGHT_FLUSH,
      };
    }

    if (this.fourOfAKind(cards)) {
      return { rank: "フォーカード", strength: HandRank.FOUR_OF_A_KIND };
    }

    if (this.fullHouse(cards)) {
      return { rank: "フルハウス", strength: HandRank.FULL_HOUSE };
    }

    if (this.flush(cards)) {
      return { rank: "フラッシュ", strength: HandRank.FLUSH };
    }

    if (this.straight(cards)) {
      return { rank: "ストレート", strength: HandRank.STRAIGHT };
    }

    if (this.threeOfAKind(cards)) {
      return { rank: "スリーカード", strength: HandRank.THREE_OF_A_KIND };
    }

    if (this.twoPair(cards)) {
      return { rank: "ツーペア", strength: HandRank.TWO_PAIR };
    }

    if (this.onePair(cards)) {
      return { rank: "ワンペア", strength: HandRank.ONE_PAIR };
    }

    return { rank: "ハイカード", strength: HandRank.HIGH_CARD };
  }

  private static royalFlush(cards: Card[]): boolean {
    const ranks = cards.map((card) => card.toNumber()).sort((a, b) => a - b);
    const expectedRanks = [10, 11, 12, 13, 14];
    return (
      this.straightFlush(cards) &&
      JSON.stringify(ranks) === JSON.stringify(expectedRanks)
    );
  }

  private static straightFlush(cards: Card[]): boolean {
    return this.straight(cards) && this.flush(cards);
  }

  private static fourOfAKind(cards: Card[]): boolean {
    const ranks = cards.map((card) => card.toNumber());
    return ranks.some((rank) => ranks.filter((r) => r === rank).length === 4);
  }

  private static fullHouse(cards: Card[]): boolean {
    const ranks = cards.map((card) => card.toNumber());
    const rankCounts = ranks.reduce((countMap, rank) => {
      countMap[rank] = (countMap[rank] || 0) + 1;
      return countMap;
    }, {} as Record<number, number>);

    const counts = Object.values(rankCounts);
    return counts.includes(2) && counts.includes(3);
  }

  private static flush(cards: Card[]): boolean {
    const set = new Set(cards.map((card) => card.suit));
    return set.size === 1;
  }

  private static straight(cards: Card[]): boolean {
    const sortedRanks = cards
      .map((card) => card.toNumber())
      .sort((a, b) => a - b);

    return (
      sortedRanks.every((rank, index) => {
        if (index === 0) return true;
        return sortedRanks[index - 1] + 1 === rank;
      }) || JSON.stringify(sortedRanks) === JSON.stringify([2, 3, 4, 5, 14])
    );
  }

  private static threeOfAKind(cards: Card[]): boolean {
    const ranks = cards.map((card) => card.toNumber());
    return ranks.some((rank) => ranks.filter((r) => r === rank).length === 3);
  }

  private static twoPair(cards: Card[]): boolean {
    const ranks = cards.map((card) => card.toNumber());
    const pairRanks = ranks.filter(
      (rank) => ranks.filter((r) => r === rank).length === 2
    );
    return new Set(pairRanks).size === 2;
  }

  private static onePair(cards: Card[]): boolean {
    const ranks = cards.map((card) => card.toNumber());
    const pairRanks = ranks.filter(
      (rank) => ranks.filter((r) => r === rank).length == 2
    );
    return new Set(pairRanks).size === 1;
  }
}
