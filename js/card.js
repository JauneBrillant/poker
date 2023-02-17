export default class Card {
  // プロパティ
  #rank;
  #suit;
  #index;

  get rank() {
    return this.#rank;
  }

  set rank(rank) {
    this.#rank = rank;
  }

  get suit() {
    return this.#suit;
  }

  set suit(suit) {
    this.#suit = suit;
  }

  get index() {
    return this.#index;
  }

  set index(index) {
    this.#index = index;
  }

  constructor(index) {
    this.rank = ((index - 1) % 13) + 1;
    // 'A'はランク14として扱う
    if (this.rank === 1) {
      this.rank = 14;
    }

    this.suit = Math.floor((index - 1) / 13) + 1;
    this.index = index;
  }
}
