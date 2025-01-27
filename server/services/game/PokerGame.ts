import { Lobby, GameState, Round, PlayerAction, Card } from "@common/types";
import { Player, Deck } from "@models";

export class PokerGame {
  private deck = new Deck();
  public state: GameState;

  constructor(lobby: Lobby) {
    const players: Player[] = lobby.players.map(
      (player) => new Player(player.id, player.name)
    );
    this.state = {
      players: players,
      communityCards: [],
      currentRound: Round.PRE_FLOP,
      mainPot: 0,
      sidePot: 0,
      currentBet: 0,
      currentPlayerIndex: 0,
      hasBetOccurred: false,
    };

    this.deck.shuffle();
    this.dealCards();
    this.revealFlop();
  }

  public nextRound(): void {
    this.state = {
      ...this.state,
      currentRound: this.state.currentRound + 1,
      mainPot: 0,
      sidePot: 0,
      hasBetOccurred: false,
    };

    this.state.players.forEach((player) => {
      player.currentBet = 0;
    });
  }

  private dealCards(): void {
    this.state.players.forEach((player) => {
      player.hand = this.deck.deal(2);
    });
  }

  private revealFlop(): void {
    this.state.communityCards = this.deck.deal(3);
  }

  private reveralTurn(): void {
    this.state.communityCards.push(this.deck.deal(1)[0]);
  }

  private revealRiver(): void {
    this.state.communityCards.push(this.deck.deal(1)[0]);
  }

  private canProceedToNextRound(): boolean {
    const activePlayers = this.state.players.filter(
      (player) => player.isActive
    );
    const betAmount = activePlayers[0].currentBet;
    return activePlayers.every((player) => player.currentBet === betAmount);
  }

  public processAction(playerIndex: number, action: PlayerAction): void {
    this.state.currentPlayerIndex = playerIndex;
    const currentPlayer = this.state.players[
      this.state.currentPlayerIndex
    ] as Player;

    switch (action) {
      case PlayerAction.FOLD:
        currentPlayer.isActive = false;
        break;

      case PlayerAction.CHECK:
        break;

      case PlayerAction.CALL:
        const callAmount = this.state.currentBet - currentPlayer.currentBet;
        currentPlayer.bet(callAmount);
        break;

      case PlayerAction.BET:
        const betAmount = 100; // UIから受け取る想定
        currentPlayer.bet(betAmount);
        this.state.currentBet = betAmount;
        this.state.hasBetOccurred = true;
        break;

      case PlayerAction.RAISE:
        const raiseAmount = 100; // UIから受け取る想定
        currentPlayer.bet(100);
        this.state.currentBet += raiseAmount;
        break;

      case PlayerAction.ALL_IN:
        currentPlayer.bet(currentPlayer.chips);
        break;
    }

    this.nextPlayer();
  }

  private nextPlayer(): void {
    do {
      this.state.currentPlayerIndex =
        (this.state.currentPlayerIndex + 1) % this.state.players.length;
    } while (!this.state.players[this.state.currentPlayerIndex].isActive);
  }
}
