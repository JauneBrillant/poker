import { Card } from "@models/Card";

export class Deck {
	private cards: Card[] = [];

	constructor() {
		const suits = ["hearts", "diamonds", "clubs", "spades"];
		const ranks = [
			"2",
			"3",
			"4",
			"5",
			"6",
			"7",
			"8",
			"9",
			"10",
			"J",
			"Q",
			"K",
			"A",
		];

		for (const suit of suits) {
			for (const rank of ranks) {
				this.cards.push(new Card(suit, rank));
			}
		}

		this.shuffle();
	}

	private shuffle(): void {
		for (let i = this.cards.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
		}
	}

	public deal(count: number): Card[] {
		return this.cards.splice(0, count);
	}
}
