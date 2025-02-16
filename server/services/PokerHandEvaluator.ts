// kickers : 同役の比較に必要なカード
// -----------------------------
// royal-flush      -  [ ] 同役になることがない
// straight-flush   -  [ストレートの最も大きい数字]
// four-of-a-kind   -  [フォーカードの数字, キッカー]
// full-house       -  [スリーカードの数字, ペアの数字]
// flush            -  [降順ソートされた５枚全て]
// straight         -  [ストレートの最も大きい数字]
// three-of-a-kind  -  [スリーカードの数字, 降順ソートされたキッカー２枚]
// two-pair         -  [高いペアの数字, 低いペアの数字, キッカー]
// one-pair         -  [ペアの数字, 降順ソートされたキッカー３枚]
// high-card        -  [降順にソートされた５枚全て]

import type { Hand } from "@common/types";
import { HandRank } from "@common/types";
import type { Card } from "@models/Card";
import type { Player } from "@models/Player";

export class PokerHandEvaluator {
  public getWinner(players: Player[]): Player {
    let winner = players[0];
    for (const player of players) {
      if (
        winner.hand.rank < player.hand.rank ||
        (winner.hand.rank === player.hand.rank &&
          this.compareKickers(winner.hand.kickers, player.hand.kickers) > 0)
      ) {
        winner = player;
      }
    }
    return winner;
  }

  public evaluate(hand: Card[]): Hand {
    const ranks = new Set(hand.map((card) => card.rank));
    return {
      cards: hand,
      rank: ranks.size === 1 ? HandRank.ONE_PAIR : HandRank.HIGH_CARD,
      strRank: ranks.size === 1 ? "ワンペア" : "ハイカード",
      kickers: hand.map((card) => card.toNumber()).sort((a, b) => b - a),
    };
  }

  public evaluateWithCommunityCard(hand: Card[], community: Card[]): Hand {
    const allCards = [...hand, ...community];
    let bestHand = {
      rank: HandRank.HIGH_CARD,
      strRank: "ハイカード",
      kickers: [] as number[],
    };

    const combinations = this.combinations<Card>(allCards, 5);
    for (const combo of combinations) {
      const currHand = this.evaluateFiveCardHand(combo);
      if (
        currHand.rank > bestHand.rank ||
        (currHand.rank === bestHand.rank &&
          this.compareKickers(currHand.kickers, bestHand.kickers) > 0)
      ) {
        bestHand = currHand;
      }
    }

    return { cards: hand, ...bestHand };
  }

  private compareKickers(a: number[], b: number[]): number {
    for (let i = 0; i < Math.min(a.length, b.length); i++) {
      if (a[i] > b[i]) return 1;
      if (a[i] < b[i]) return -1;
    }
    return 0;
  }

  private evaluateFiveCardHand(cards: Card[]) {
    if (this.royalFlush(cards)) {
      return {
        rank: HandRank.ROYAL_FLUSH,
        strRank: "ロイヤルフラッシュ",
        kickers: [14],
      };
    }

    if (this.straightFlush(cards)) {
      return {
        rank: HandRank.STRAIGHT_FLUSH,
        strRank: "ストレートフラッシュ",
        kickers: [this.getHighestRank(cards)],
      };
    }

    if (this.fourOfAKind(cards)) {
      const rankCounts = this.getRankCounts(cards);
      const fourRank = Object.keys(rankCounts).find((rank) => rankCounts[rank] === 4);
      const kicker = Object.keys(rankCounts).find((rank) => rankCounts[rank] === 1);
      return {
        rank: HandRank.FOUR_OF_A_KIND,
        strRank: "フォーカード",
        kickers: [Number(fourRank), Number(kicker)],
      };
    }

    if (this.fullHouse(cards)) {
      const rankCounts = this.getRankCounts(cards);
      const threeRank = Object.keys(rankCounts).find((rank) => rankCounts[rank] === 3);
      const pairRank = Object.keys(rankCounts).find((rank) => rankCounts[rank] === 2);
      return {
        rank: HandRank.FULL_HOUSE,
        strRank: "フルハウス",
        kickers: [Number(threeRank), Number(pairRank)],
      };
    }

    if (this.flush(cards)) {
      const sortedRanks = this.getSortedRanks(cards);
      return {
        rank: HandRank.FLUSH,
        strRank: "フラッシュ",
        kickers: sortedRanks,
      };
    }

    if (this.straight(cards)) {
      return {
        rank: HandRank.STRAIGHT,
        strRank: "ストレート",
        kickers: [this.getHighestRank(cards)],
      };
    }

    if (this.threeOfAKind(cards)) {
      const rankCounts = this.getRankCounts(cards);
      const threeRank = Object.keys(rankCounts).find((rank) => rankCounts[rank] === 3);
      const kickers = Object.keys(rankCounts)
        .filter((rank) => rankCounts[rank] === 1)
        .map(Number)
        .sort((a, b) => b - a);
      return {
        rank: HandRank.THREE_OF_A_KIND,
        strRank: "スリーカード",
        kickers: [Number(threeRank), ...kickers],
      };
    }

    if (this.twoPair(cards)) {
      const rankCounts = this.getRankCounts(cards);
      const pairs = Object.keys(rankCounts)
        .filter((rank) => rankCounts[rank] === 2)
        .map(Number)
        .sort((a, b) => b - a);
      const kicker = Object.keys(rankCounts).find((rank) => rankCounts[rank] === 1);
      return {
        rank: HandRank.TWO_PAIR,
        strRank: "ツーペア",
        kickers: [...pairs, Number(kicker)],
      };
    }

    if (this.onePair(cards)) {
      const rankCounts = this.getRankCounts(cards);
      const pairs = Object.keys(rankCounts).find((rank) => rankCounts[rank] === 2);
      const kickers = Object.keys(rankCounts)
        .filter((rank) => rankCounts[rank] === 1)
        .map(Number)
        .sort((a, b) => b - a);
      return {
        rank: HandRank.ONE_PAIR,
        strRank: "ワンペア",
        kickers: [Number(pairs), ...kickers],
      };
    }

    return {
      rank: HandRank.HIGH_CARD,
      strRank: "ハイカード",
      kickers: this.getSortedRanks(cards),
    };
  }

  private royalFlush(cards: Card[]): boolean {
    const ranks = cards.map((card) => card.toNumber()).sort((a, b) => a - b);
    const expectedRanks = [10, 11, 12, 13, 14];
    return this.straightFlush(cards) && JSON.stringify(ranks) === JSON.stringify(expectedRanks);
  }

  private straightFlush(cards: Card[]): boolean {
    return this.straight(cards) && this.flush(cards);
  }

  private fourOfAKind(cards: Card[]): boolean {
    const ranks = cards.map((card) => card.toNumber());
    return ranks.some((rank) => ranks.filter((r) => r === rank).length === 4);
  }

  private fullHouse(cards: Card[]): boolean {
    const rankCounts = this.getRankCounts(cards);
    const counts = Object.values(rankCounts);
    return counts.includes(2) && counts.includes(3);
  }

  private flush(cards: Card[]): boolean {
    const set = new Set(cards.map((card) => card.suit));
    return set.size === 1;
  }

  private straight(cards: Card[]): boolean {
    const sortedRanks = cards.map((card) => card.toNumber()).sort((a, b) => a - b);

    return (
      sortedRanks.every((rank, index) => {
        if (index === 0) return true;
        return sortedRanks[index - 1] + 1 === rank;
      }) || JSON.stringify(sortedRanks) === JSON.stringify([2, 3, 4, 5, 14])
    );
  }

  private threeOfAKind(cards: Card[]): boolean {
    const ranks = cards.map((card) => card.toNumber());
    return ranks.some((rank) => ranks.filter((r) => r === rank).length === 3);
  }

  private twoPair(cards: Card[]): boolean {
    const ranks = cards.map((card) => card.toNumber());
    const pairRanks = ranks.filter((rank) => ranks.filter((r) => r === rank).length === 2);
    return new Set(pairRanks).size === 2;
  }

  private onePair(cards: Card[]): boolean {
    const ranks = cards.map((card) => card.toNumber());
    const pairRanks = ranks.filter((rank) => ranks.filter((r) => r === rank).length === 2);
    return new Set(pairRanks).size === 1;
  }

  private combinations<T>(arr: T[], size: number): T[][] {
    const res: T[][] = [];
    const helper = (start: number, chosen: T[]) => {
      if (chosen.length === size) {
        res.push([...chosen]);
        return;
      }
      for (let i = start; i < arr.length; i++) {
        chosen.push(arr[i]);
        helper(i + 1, chosen);
        chosen.pop();
      }
    };
    helper(0, []);
    return res;
  }

  private getRankCounts(cards: Card[]) {
    return cards.reduce(
      (countMap, card) => {
        const rank = card.toNumber();
        countMap[rank] = (countMap[rank] || 0) + 1;
        return countMap;
      },
      {} as Record<number, number>,
    );
  }

  private getSortedRanks(cards: Card[]) {
    return cards.map((card) => card.toNumber()).sort((a, b) => b - a);
  }

  private getHighestRank(cards: Card[]) {
    return Math.max(...cards.map((card) => card.toNumber()));
  }
}
