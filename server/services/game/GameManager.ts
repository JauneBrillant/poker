import { GameState, Round } from "@common/types";
import { Player, Deck } from "@models";

export class GameManager {
  private deck = new Deck();
  private state: GameState;

  constructor(players: Player[]) {
    this.state = {
      players,
      communityCards: [],
      round: Round.PRE_FLOP,
      pot: 0,
      activePlayer: 0,
    };
  }

  public getGameState(): GameState {
    return this.state;
  }

  public startGame(): void {
    this.deck.shuffle();
    this.dealCards();
    this.revealFlop();
  }

  private dealCards(): void {
    for (const player of this.state.players as Player[]) {
      player.setCards(this.deck.deal(2));
    }
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
}
