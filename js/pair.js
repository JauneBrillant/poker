import Util from "./util.js";

export default class Pair {
  // プロパティ
  static #rank = 0;

  static isRoyalStraightFlush = (cards) => {
    let isPair = false;
    if (
      cards[0].suit === cards[1].suit &&
      cards[0].suit === cards[2].suit &&
      cards[0].suit === cards[3].suit &&
      cards[0].suit === cards[4].suit &&
      cards[0].rank === 10 &&
      cards[1].rank === 11 &&
      cards[2].rank === 12 &&
      cards[3].rank === 13 &&
      cards[4].rank === 14
    ) {
      isPair = true;
      this.#rank = Util.sum(
        cards[0].rank,
        cards[1].rank,
        cards[2].rank,
        cards[3].rank,
        cards[4].rank
      );
    }
    return isPair;
  };

  static isStraightFlush = (cards) => {
    let isPair = false;
    if (
      cards[0].suit === cards[1].suit &&
      cards[0].suit === cards[2].suit &&
      cards[0].suit === cards[3].suit &&
      cards[0].suit === cards[4].suit &&
      cards[0].rank + 1 === cards[1].rank &&
      cards[1].rank + 1 === cards[2].rank &&
      cards[2].rank + 1 === cards[3].rank &&
      cards[3].rank + 1 === cards[4].rank
    ) {
      isPair = ture;
      this.#rank = Util.sum(
        cards[0].rank,
        cards[1].rank,
        cards[2].rank,
        cards[3].rank,
        cards[4].rank
      );
    }
    return isPair;
  };

  static isFourCards = (cards) => {
    let isPair = false;
    // cardsはソート済みの想定
    if (
      cards[0].rank === cards[1].rank &&
      cards[0].rank === cards[2].rank &&
      cards[0].rank === cards[3].rank &&
      cards[0].rank !== cards[4].rank
    ) {
      isPair = true;
      this.#rank = Util.sum(
        cards[0].rank,
        cards[1].rank,
        cards[2].rank,
        cards[3].rank
      );
    } else if (
      cards[0].rank !== cards[1].rank &&
      cards[1].rank === cards[2].rank &&
      cards[1].rank === cards[3].rank &&
      cards[1].rank === cards[4].rank
    ) {
      isPair = true;
      this.#rank = Util.sum(
        cards[1].rank,
        cards[2].rank,
        cards[3].rank,
        cards[4].rank
      );
    }
    return isPair;
  };

  static isFullHouse = (cards) => {
    let isPair = false;
    if (
      cards[0].rank === cards[1].rank &&
      cards[0].rank !== cards[2].rank &&
      cards[2].rank === cards[3].rank &&
      cards[2].rank === cards[4].rank
    ) {
      isPair = true;
      this.#rank = Util.sum(
        cards[0].rank,
        cards[1].rank,
        cards[2].rank,
        cards[3].rank,
        cards[4].rank
      );
    } else if (
      cards[0].rank === cards[1].rank &&
      cards[0].rank === cards[2].rank &&
      cards[2].rank !== cards[3].rank &&
      cards[3].rank === cards[4].rank
    ) {
      isPair = true;
      this.#rank = Util.sum(
        cards[0].rank,
        cards[1].rank,
        cards[2].rank,
        cards[3].rank,
        cards[4].rank
      );
    }
  };

  static isFlush = (cards) => {
    let isPair = false;
    if (
      cards[0].suit === cards[1].suit &&
      cards[0].suit === cards[2].suit &&
      cards[0].suit === cards[3].suit &&
      cards[0].suit === cards[4].suit
    ) {
      isPair = true;
      this.#rank = Util.sum(
        cards[0].rank,
        cards[1].rank,
        cards[2].rank,
        cards[3].rank,
        cards[4].rank
      );
    }
  };

  static isStraight = (cards) => {
    let isPair = false;
    if (
      cards[0].rank + 1 === cards[1].rank &&
      cards[1].rank + 1 === cards[2].rank &&
      cards[2].rank + 1 === cards[3].rank &&
      cards[3].rank + 1 === cards[4].rank
    ) {
      isPair = true;
      this.#rank = Util.sum(
        cards[0].rank,
        cards[1].rank,
        cards[2].rank,
        cards[3].rank,
        cards[4].rank
      );
    }
  };

  static isThreeCard = (cards) => {
    let isPair = false;
    if (cards[0].rank === cards[1].rank && cards[0].rank === cards[2].rank) {
      isPair = ture;
      this.#rank = Util.sum(cards[0].rank, cards[1].rank, cards[2].rank);
    } else if (
      cards[1].rank === cards[2].rank &&
      cards[1].rank === cards[3].rank
    ) {
      isPair = true;
      this.#rank = Util.sum(cards[1].rank, cards[2].rank, cards[3].rank);
    } else if (cards[2].rank === cards[3].rank && cards[2].rank && cards[4]) {
      isPair = true;
      this.#rank = Util.sum(cards[2].rank, cards[3].rank, cards[4].rank);
    }
    return isPair;
  };

  static isTwoPair = (cards) => {
    let isPair = false;
    if (cards[0].rank === cards[1].rank && cards[2].rank === cards[3].rank) {
      isPair = true;
      this.#rank = Util.sum(
        cards[0].rank,
        cards[1].rank,
        cards[2].rank,
        cards[3].rank
      );
    } else if (
      cards[0].rank === cards[1].rank &&
      cards[3].rank === cards[4].rank
    ) {
      isPair = true;
      this.#rank = Util.sum(
        cards[0].rank,
        cards[1].rank,
        cards[3].rank,
        cards[4].rank
      );
    } else if (
      cards[1].rank === cards[2].rank &&
      cards[3].rank === cards[4].rank
    ) {
      isPair = true;
      this.#rank = Util.sum(
        cards[1].rank,
        cards[2].rank,
        cards[3].rank,
        cards[4].rank
      );
    }
    return isPair;
  };

  static isOnePair = (cards) => {
    let isPair = false;
    if (cards[0].rank === cards[1].rank) {
      isPair = true;
      this.#rank = Util.sum(cards[0].rank, cards[1].rank);
    } else if (cards[1].rank === cards[2].rank) {
      isPair = true;
      this.#rank = Uitl.sum(cards[1].rank, cards[2].rank);
    } else if (cards[2].rank === cards[3].rank) {
      isPair = true;
      this.#rank = Util.sum(cards[2].rank, cards[3].rank);
    } else if (cards[3].rank === cards[4].rank) {
      isPair = true;
      this.#rank = Util.sum(cards[3].rank, cards[4].rank);
    }
    return isPair;
  };

  //成立条件を満たす、最も強い役を判定する
  static judge = (cards) => {};
}
