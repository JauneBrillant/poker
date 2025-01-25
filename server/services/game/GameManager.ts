import { GameState, Round } from "@common/types";
import { Player, Deck } from "@models";

export class GameManager {
  private deck = new Deck();
  private gameState: GameState;

  constructor(players: Player[]) {
    this.gameState = {
      players,
      communityCards: [],
      round: Round.PRE_FLOP,
      pot: 0,
      activePlayer: 0,
    };
  }

  public getGameState(): GameState {
    return this.gameState;
  }

  public startGame(): void {
    this.deck.shuffle();
    this.dealCards();
    this.revealFlop();
  }

  private dealCards(): void {
    for (const player of this.gameState.players as Player[]) {
      player.setCards(this.deck.deal(2));
    }
  }

  private revealFlop(): void {
    this.gameState.communityCards = this.deck.deal(3);
  }

  private reveralTurn(): void {
    this.gameState.communityCards.push(this.deck.deal(1)[0]);
  }

  private revealRiver(): void {
    this.gameState.communityCards.push(this.deck.deal(1)[0]);
  }
}
