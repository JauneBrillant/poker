import type { Card } from "./Card";
import type { HandRank } from "./HandRank";

export interface Hand {
	cards: Card[];
	rank: HandRank;
	strRank: string;
	kickers: number[];
}
