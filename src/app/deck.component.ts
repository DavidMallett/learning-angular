import { Card } from './card';
import { DeckInterface } from './models/deck.interface';
// import { Player } from './player';
const _ = require('lodash');

export class Deck implements DeckInterface {

  public library: Array<Card>;
  public name: string;
  public format: string;
  public cardsLeft: number;
  public isShuffled: boolean;
  // public owner: Player;

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
      const c: Card = this.library.pop();
      // this method should be in the Player class
      // this.owner.yard.push(c);
      c.zone.name = 'graveyard';
    }
  }

  public lookAt(topX: number): Array<Card> {
    // deliberate for loop
    const arr: Array<Card> = [];
    for (let i = 0; i < topX; i++) {
      arr.push(this.library.pop());
    }
    return arr;
  }

  public putBackOnTop(arr: Array<Card>): void {
    _.each(arr, (c: Card) => {
      this.library.push(c);
    });
  }

  public putOnBottom(arr: Array<Card>): void {
    _.each(arr, (c: Card) => {
      this.library.unshift(c);
    });
  }

  // public scry(n: number): void {
  //   const toSee: Array<Card> = [];
  //   const toBottom: Array<Card> = [];
  //   for (let i = 0; i < n; i++) {
  //     toSee.push(this.library.pop());
  //   }
  //   _.each(toSee, (card: Card) => {

  //   });
  // }

  public tutor(cardName: string): Card {
    return _.find(this.library, (cards) => {
      return cards.name === cardName;
    }).then(() => {
      this.shuffle();
    });
  }

  public draw(): Card {
    const cardToReturn = this.library.pop();
    cardToReturn.zone.name = 'hand';
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

