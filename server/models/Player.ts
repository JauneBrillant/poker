import { PlayerAction } from "@common/types";
import type { TablePosition } from "@common/types";
import type { GameState, Hand, Player as PlayerInterface } from "@common/types";
import { TablePositionArray } from "@common/types";
import { PokerHandEvaluator } from "@services/PokerHandEvaluator";
import type { Card } from "./Card";

export class Player implements PlayerInterface {
	private evaluator = new PokerHandEvaluator();
	public name: string;
	public hand: Hand;
	public position: TablePosition;
	public chips: number;
	public currentBet: number;
	public isActive: boolean;
	public availableActions: PlayerAction[];

	constructor(
		index: number,
		name: string,
		cards: Card[],
		communityCards: Card[],
	) {
		this.name = name;
		this.hand = this.evaluator.evaluate(cards, communityCards);
		this.position = TablePositionArray[index];
		this.chips = 1000;
		this.currentBet = 0;
		this.isActive = true;
		this.availableActions = [];
	}

	public bet(amount: number): void {
		this.chips -= amount;
		this.currentBet += amount;
	}

	public addChips(amount: number): void {
		this.chips += amount;
	}

	public setAvailableActions(gameState: GameState): void {
		const actions = [PlayerAction.FOLD];

		// fold済み
		if (!this.isActive) {
			this.availableActions = [];
		}

		if (this.chips <= 0) {
			this.availableActions = [PlayerAction.ALL_IN];
		}

		if (!gameState.hasBetOccurred) {
			actions.push(PlayerAction.CHECK, PlayerAction.BET);
		} else {
			const callAmount = gameState.currentBet - this.currentBet;
			if (this.chips >= callAmount) {
				actions.push(PlayerAction.CALL);
			} else {
				actions.push(PlayerAction.ALL_IN); // コール額を満たせないとき
			}

			actions.push(PlayerAction.RAISE);
		}

		this.availableActions = [];
		this.availableActions = [...actions];
	}
}
