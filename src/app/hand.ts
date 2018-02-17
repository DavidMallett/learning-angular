import { Card } from './card';
import { Deck } from './deck.component';

export class Hand {

  public cardsInHand: Array<Card>;
  public theDeck: Deck;

  constructor() {
    this.cardsInHand = [];
  }

  public draw(): Card {
    return this.theDeck.draw();
  }

  public add(card: Card): void {
    this.cardsInHand.push(card);
  }

  public remove(card: Card): Card {
    this.cardsInHand.filter((currentValue: Card) => {
      if (currentValue.uuid === card.uuid) {
        return currentValue;
      }
    });
    throw new Error('Unable to remove card. Maybe it wasnt in hand?');
  }

  public toString(): string {
    
  }

  public view(): void {
    let resp = 'Cards in hand:\n';
    for (let i = 0; i < this.cardsInHand.length; i++) {
      resp += this.cardsInHand[i].name + '\n';
      if (i === this.cardsInHand.length - 1) {
        console.log(resp);
      }
    }
  }

  public inHand(name: string): boolean {
    for (const card of this.cardsInHand) {
      if (card.name === name) {
        return true;
      }
    }
    return false;
  }

  public drawOpening7(): void {
    const theHand = new Array<Card>();
    for (let i = 0; i < 7; i++) {
      theHand.push(this.theDeck.draw());
      if (i === 6) {
        this.cardsInHand = theHand;
      }
    }
  }

}
