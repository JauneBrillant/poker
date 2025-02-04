import type { Card } from "@common/types";

export const getCardImagePath = (card: Card) => {
	return `/assets/images/card_${card.suit}_${card.rank}`;
};
