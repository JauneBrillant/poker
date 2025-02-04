import { PlayerAction, Round, TablePosition } from "@common/types";
import type { GameState } from "@common/types";
import { getNextRound } from "@common/types";
import { Deck } from "@models/Deck";
import { Player } from "@models/Player";

export class PokerGame {
  private deck = new Deck();
  private SMALL_BLIND = 10;
  private BIG_BLIND = 20;
  public state: GameState;

  constructor(lobbyMembers: string[]) {
    const players: Player[] = lobbyMembers.map((playerName, index) => new Player(index, playerName, this.deck.deal(2)));

    this.state = {
      players,
      communityCards: [],
      currentRound: Round.PRE_FLOP,
      mainPot: 0,
      sidePot: 0,
      currentBet: 0,
      currentPlayerIndex: 0,
      hasBetOccurred: false,
    };

    this.state.players[0].isTurn = true;
  }

  public blindsPay(): void {
    const sb = this.state.players.find((p) => p.position === TablePosition.SB) as Player;
    const bb = this.state.players.find((p) => p.position === TablePosition.BB) as Player;
    sb.bet(this.SMALL_BLIND);
    bb.bet(this.BIG_BLIND);
    this.state.hasBetOccurred = true;
  }

  public processAction(action: PlayerAction, betAmount?: number, raiseAmount?: number): void {
    const currentPlayer = this.state.players[this.state.currentPlayerIndex] as Player;

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

    if (this.canProceedToNextRound()) {
      this.nextPlayer();
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

  private nextRound(): void {
    this.state.currentRound = getNextRound(this.state.currentRound);
    this.state.hasBetOccurred = false;

    if (this.state.currentRound === Round.FLOP) {
      this.revealFlop();
    } else if (this.state.currentRound === Round.TURN) {
      this.revealTurn();
    } else if (this.state.currentRound === Round.RIVER) {
      this.revealRiver();
    }

    for (const player of this.state.players) {
      player.currentBet = 0;
    }
  }

  private revealFlop(): void {
    this.state.communityCards.push(...this.deck.deal(3));
  }

  private revealTurn(): void {
    this.state.communityCards.push(this.deck.deal(1)[0]);
  }

  private revealRiver(): void {
    this.state.communityCards.push(this.deck.deal(1)[0]);
  }

  private canProceedToNextRound(): boolean {
    const activePlayers = this.state.players.filter((player) => player.isActive);
    const betAmount = activePlayers[0].currentBet;
    return activePlayers.every((player) => player.currentBet === betAmount);
  }

  private nextPlayer(): void {
    this.state.players[this.state.currentPlayerIndex].isTurn = false;
    do {
      this.state.currentPlayerIndex = (this.state.currentPlayerIndex + 1) % this.state.players.length;
    } while (!this.state.players[this.state.currentPlayerIndex].isActive);
    this.state.players[this.state.currentPlayerIndex].isTurn = true;
  }

  private endGame(): void {
    const winner = this.state.players.filter((p) => p.isActive)[0];
    winner.chips += this.state.mainPot;
    this.state.mainPot = 0;
  }
}
