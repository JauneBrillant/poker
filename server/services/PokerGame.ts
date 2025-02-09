import EventEmitter from "node:events";
import { PlayerAction, Round, SocketEvent, TablePosition } from "@common/types";
import type { GameState } from "@common/types";
import { getNextRound } from "@common/types";
import type { Card } from "@models/Card";
import { Deck } from "@models/Deck";
import { Player } from "@models/Player";

export class PokerGame extends EventEmitter {
  private deck = new Deck();
  public state: GameState;

  readonly lobbyId: string;
  readonly SMALL_BLIND = 10;
  readonly BIG_BLIND = 20;

  constructor(lobbyMembers: string[], lobbyId: string) {
    super();
    this.lobbyId = lobbyId;

    const players: Player[] = lobbyMembers.map((playerName, index) => new Player(index, playerName, this.deck.deal(2), lobbyMembers.length));

    this.state = {
      players,
      communityCards: [],
      currentRound: Round.PRE_FLOP,
      mainPot: 0,
      sidePot: 0,
      maxBetThisRound: 0,
      currentPlayerIndex: 0,
      hasBetOccurred: false,
    };

    this.blindsPay();
    this.setCurrentPlayerIndexAndTurn();
    this.updateCurrentPlayerAvailableAction();
  }

  public blindsPay(): void {
    const sb = this.state.players.find((p) => p.position === TablePosition.SB) as Player;
    const bb = this.state.players.find((p) => p.position === TablePosition.BB) as Player;
    sb.bet(this.SMALL_BLIND);
    bb.bet(this.BIG_BLIND);
    this.state.maxBetThisRound = this.BIG_BLIND;
    this.state.mainPot = this.BIG_BLIND + this.SMALL_BLIND;
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
        const callAmount = this.state.maxBetThisRound - currentPlayer.currentRoundBet;
        currentPlayer.bet(callAmount);
        this.state.mainPot += callAmount;
        break;
      }

      case PlayerAction.BET: {
        currentPlayer.bet(betAmount);
        this.state.maxBetThisRound = betAmount;
        this.state.hasBetOccurred = true;
        this.state.mainPot += betAmount;
        break;
      }

      case PlayerAction.RAISE: {
        currentPlayer.bet(raiseAmount);
        this.state.maxBetThisRound += raiseAmount;
        this.state.mainPot += raiseAmount;
        break;
      }

      case PlayerAction.ALL_IN:
        this.state.mainPot += currentPlayer.chips;
        currentPlayer.bet(currentPlayer.chips);
        break;
    }

    currentPlayer.isActionTakenThisRound = true;

    if (this.state.players.filter((p) => p.isActive).length === 1) {
      const winner = this.state.players.find((p) => p.isActive);
      this.emit(SocketEvent.GAME_WINNER, winner.name, this.lobbyId);
      // restart_game();
    }

    if (this.canProceedToNextRound()) {
      this.nextRound();
      this.updatePlayersHandRank();
      this.setCurrentPlayerIndexAndTurn();
      this.updateCurrentPlayerAvailableAction();

      if (this.state.currentRound === Round.SHOWDOWN) {
        // ShowDown();
      }
    } else {
      this.nextPlayer();
    }
  }

  private canProceedToNextRound(): boolean {
    const activePlayers = this.state.players.filter((player) => player.isActive);
    const betAmount = activePlayers[0].currentRoundBet;
    // TODO
    // オールインしたプレイヤーがいる時、全員のベット額が揃わなくても次のラウンドにいくことがある
    return activePlayers.every((player) => player.currentRoundBet === betAmount && player.isActionTakenThisRound);
  }

  private nextPlayer(): void {
    this.state.players[this.state.currentPlayerIndex].isTurn = false;
    do {
      this.state.currentPlayerIndex = (this.state.currentPlayerIndex + 1) % this.state.players.length;
    } while (!this.state.players[this.state.currentPlayerIndex].isActive);

    (this.state.players[this.state.currentPlayerIndex] as Player).isTurn = true;
    this.updateCurrentPlayerAvailableAction();
  }

  private nextRound(): void {
    this.state.currentRound = getNextRound(this.state.currentRound);

    this.state.hasBetOccurred = false;
    this.state.maxBetThisRound = 0;

    if (this.state.currentRound === Round.FLOP) {
      this.revealFlop();
    } else if (this.state.currentRound === Round.TURN) {
      this.revealTurn();
    } else if (this.state.currentRound === Round.RIVER) {
      this.revealRiver();
    }

    for (const player of this.state.players) {
      player.currentRoundBet = 0;
      player.isActionTakenThisRound = false;
      player.isTurn = false;
    }
  }

  private setCurrentPlayerIndexAndTurn() {
    if (this.state.currentRound === Round.PRE_FLOP) {
      this.state.currentPlayerIndex = this.state.players.findIndex((p) => p.isTurn);
    } else {
      this.state.currentPlayerIndex = this.state.players.findIndex((p) => p.isActive && !p.isBtn);
      this.state.players[this.state.currentPlayerIndex].isTurn = true;
    }
  }

  private updatePlayersHandRank(): void {
    for (const player of this.state.players) {
      (player as Player).updateHandInfo(this.state.communityCards as Card[]);
    }
  }

  private updateCurrentPlayerAvailableAction() {
    (this.state.players[this.state.currentPlayerIndex] as Player).setAvailableAction(this.state);
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
}
