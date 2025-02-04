import { HandRank } from "@common/types";
import { Card } from "@models/Card";
import { PokerHandEvaluator } from "@services/PokerHandEvaluator";

describe("HandEvaluator", () => {
  let evaluator: PokerHandEvaluator;
  beforeEach(() => {
    evaluator = new PokerHandEvaluator();
  });

  test("should return HandRank.ROYAL_FLUSH", () => {
    const cards = [new Card("hearts", "10"), new Card("hearts", "J"), new Card("hearts", "Q"), new Card("hearts", "K"), new Card("hearts", "A")];
    const result = evaluator.evaluate(cards);
    expect(result).toEqual({
      rank: "ロイヤルフラッシュ",
      strength: HandRank.ROYAL_FLUSH,
    });
  });

  test("should return HandRank.STRAIGHT_FLUSH", () => {
    const cards = [new Card("hearts", "2"), new Card("hearts", "3"), new Card("hearts", "4"), new Card("hearts", "5"), new Card("hearts", "6")];
    const result = evaluator.evaluate(cards);
    expect(result).toEqual({
      rank: "ストレートフラッシュ",
      strength: HandRank.STRAIGHT_FLUSH,
    });
  });

  test("should return HandRank.FOUR_OF_A_KIND", () => {
    const cards = [new Card("hearts", "2"), new Card("diamonds", "2"), new Card("clubs", "2"), new Card("spades", "2"), new Card("hearts", "3")];
    const result = evaluator.evaluate(cards);
    expect(result).toEqual({
      rank: "フォーカード",
      strength: HandRank.FOUR_OF_A_KIND,
    });
  });

  test("should return HandRank.FULL_HOUSE", () => {
    const cards = [new Card("hearts", "2"), new Card("diamonds", "2"), new Card("clubs", "2"), new Card("spades", "3"), new Card("hearts", "3")];
    const result = evaluator.evaluate(cards);
    expect(result).toEqual({
      rank: "フルハウス",
      strength: HandRank.FULL_HOUSE,
    });
  });

  test("should return HandRank.FLUSH", () => {
    const cards = [new Card("hearts", "2"), new Card("hearts", "7"), new Card("hearts", "9"), new Card("hearts", "10"), new Card("hearts", "K")];
    const result = evaluator.evaluate(cards);
    expect(result).toEqual({
      rank: "フラッシュ",
      strength: HandRank.FLUSH,
    });
  });

  test("should return HandRank.STRAIGHT. Ace as 1", () => {
    const cards = [new Card("Diamonds", "1"), new Card("hearts", "2"), new Card("hearts", "3"), new Card("hearts", "4"), new Card("hearts", "5")];
    const result = evaluator.evaluate(cards);
    expect(result).toEqual({
      rank: "ストレート",
      strength: HandRank.STRAIGHT,
    });
  });

  test("should return HandRank.STRAIGHT. Ace as 14", () => {
    const cards = [new Card("Diamonds", "10"), new Card("hearts", "J"), new Card("hearts", "Q"), new Card("hearts", "K"), new Card("hearts", "A")];
    const result = evaluator.evaluate(cards);
    expect(result).toEqual({
      rank: "ストレート",
      strength: HandRank.STRAIGHT,
    });
  });

  test("should return HandRank.THREE_OF_A_KIND", () => {
    const cards = [new Card("hearts", "2"), new Card("diamonds", "2"), new Card("clubs", "2"), new Card("spades", "3"), new Card("hearts", "4")];
    const result = evaluator.evaluate(cards);
    expect(result).toEqual({
      rank: "スリーカード",
      strength: HandRank.THREE_OF_A_KIND,
    });
  });

  test("should return HandRank.TWO_PAIR", () => {
    const cards = [new Card("hearts", "2"), new Card("diamonds", "2"), new Card("clubs", "3"), new Card("spades", "3"), new Card("hearts", "4")];
    const result = evaluator.evaluate(cards);
    expect(result).toEqual({
      rank: "ツーペア",
      strength: HandRank.TWO_PAIR,
    });
  });

  test("should return HandRank.ONE_PAIR", () => {
    const cards = [new Card("hearts", "2"), new Card("diamonds", "2"), new Card("clubs", "3"), new Card("spades", "4"), new Card("hearts", "5")];
    const result = evaluator.evaluate(cards);
    expect(result).toEqual({
      rank: "ワンペア",
      strength: HandRank.ONE_PAIR,
    });
  });

  test("should return HandRank.HIGH_CARD", () => {
    const cards = [new Card("hearts", "2"), new Card("diamonds", "3"), new Card("clubs", "4"), new Card("spades", "5"), new Card("hearts", "7")];
    const result = evaluator.evaluate(cards);
    expect(result).toEqual({
      rank: "ハイカード",
      strength: HandRank.HIGH_CARD,
    });
  });
});
