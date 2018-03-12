import { Card } from './card';
import { DeckInterface } from './models/deck.interface';
import { Player } from './player';
const _ = require('lodash');

export class Deck implements DeckInterface {

  public library: Array<Card>;
  public name: string;
  public format: string;
  public cardsLeft: number;
  public isShuffled: boolean;
  public owner: Player;

  constructor(lib: Array<Card>, name: string) {
    this.library = lib;
    this.name = name;
    this.isShuffled = false;
    this.cardsLeft = lib.length;
  }

  public shuffle(): void {
    this.library = _.shuffle(this.library);
    this.isShuffled = true;
  }

  public addCard(card: Card): void {
    // used when building a deck
    this.library.push(card);
  }

  public mill(n: number): void {
    // deliberate for loop
    for (let i = 0; i < n; i++) {
      this.owner.yard.push(this.library.pop());
      // todo: edit zone information on the cards perhaps?
    }
  }

  public tutor(cardName: string): Card {
    return _.find(this.library, (cards) => {
      return cards.name === cardName;
    }).then(() => {
      this.shuffle();
    });
  }

  public draw(): Card {
    const cardToReturn = this.library.pop();
    //
    // Additional logic here if necessary
    //
    return cardToReturn;
  }

  // public validateForStandard(): void {
  //   for (let i = 0; i < this.library.length; i++) {
  //     const theCard = this.library[i];
  //     if (!(theCard.legality.indexOf('standard') > -1)) {
  //       throw new Error('Deck is not Standard legal');
  //     }
  //   }
  // }

}

