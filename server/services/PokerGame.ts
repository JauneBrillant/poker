import { PlayerAction, Round } from "@common/types";
import type { GameState } from "@common/types";
import { getNextRound } from "@common/types";
import { Deck } from "@models/Deck";
import { Player } from "@models/Player";

export class PokerGame {
	private deck = new Deck();
	public state: GameState;

	constructor(lobbyMembers: string[]) {
		const communityCards = this.deck.deal(3);
		const players: Player[] = lobbyMembers.map(
			(playerName, index) =>
				new Player(index, playerName, this.deck.deal(2), communityCards),
		);

		this.state = {
			players,
			communityCards,
			currentRound: Round.PRE_FLOP,
			mainPot: 0,
			sidePot: 0,
			currentBet: 0,
			currentPlayerIndex: 0,
			hasBetOccurred: false,
		};
	}

	public processAction(
		action: PlayerAction,
		betAmount?: number,
		raiseAmount?: number,
	): void {
		const currentPlayer = this.state.players[
			this.state.currentPlayerIndex
		] as Player;

		switch (action) {
			case PlayerAction.FOLD:
				currentPlayer.isActive = false;
				break;

			case PlayerAction.CHECK:
				break;

			case PlayerAction.CALL: {
				const callAmount = this.state.currentBet - currentPlayer.currentBet;
				currentPlayer.bet(callAmount);
				break;
			}

			case PlayerAction.BET: {
				currentPlayer.bet(betAmount);
				this.state.currentBet = betAmount;
				this.state.hasBetOccurred = true;
				break;
			}

			case PlayerAction.RAISE: {
				currentPlayer.bet(raiseAmount);
				this.state.currentBet += raiseAmount;
				break;
			}

			case PlayerAction.ALL_IN:
				currentPlayer.bet(currentPlayer.chips);
				break;
		}

		this.updatePlayersAvailableActions();

		if (this.canProceedToNextRound()) {
			this.nextRound();
		} else {
			this.nextPlayer();
		}
	}

	private updatePlayersAvailableActions(): void {
		for (const player of this.state.players) {
			(player as Player).setAvailableActions(this.state);
		}
	}

	private updatePlayersHandRank(): void {
		//
	}

	public nextRound(): void {
		this.state = {
			...this.state,
			currentRound: getNextRound(this.state.currentRound),
			mainPot: 0,
			sidePot: 0,
			hasBetOccurred: false,
		};

		for (const player of this.state.players) {
			player.currentBet = 0;
		}
	}

	private reveralTurn(): void {
		this.state.communityCards.push(this.deck.deal(1)[0]);
	}

	private revealRiver(): void {
		this.state.communityCards.push(this.deck.deal(1)[0]);
	}

	private canProceedToNextRound(): boolean {
		const activePlayers = this.state.players.filter(
			(player) => player.isActive,
		);
		const betAmount = activePlayers[0].currentBet;
		return activePlayers.every((player) => player.currentBet === betAmount);
	}

	private nextPlayer(): void {
		do {
			this.state.currentPlayerIndex =
				(this.state.currentPlayerIndex + 1) % this.state.players.length;
		} while (!this.state.players[this.state.currentPlayerIndex].isActive);
	}
}
