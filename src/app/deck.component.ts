import { Card } from './card';

export class Deck {

    constructor(
        private library: Array<Card>,
        private name: string,
        private format: string, // enum: 'standard' || 'modern' || 'edh' etc
        private isShuffled: boolean,
        private cardsLeft: number
    ) {
        this.library = library;
        this.name = name;
        this.format = format;
        this.isShuffled = false;
        this.cardsLeft = this.library.length;
    }

    public shuffle(): Array<Card> {
        const newLibrary = new Array<Card>();
        let m = this.library.length, t, i;
        while (m) {
            i = Math.floor(Math.random() * m--);
            t = this.library[m];
            newLibrary.push(this.library[i]);
        }
        return this.library = newLibrary;
    }

    public draw(): Card {
      const cardToReturn = this.library.pop();
      //
      // Additional logic here if necessary
      //
      return cardToReturn;
    }

    public validateForStandard(): void {
      for (let i = 0; i < this.library.length; i++) {
        const theCard = this.library[i];
        if (!(theCard.legality.indexOf('standard') > -1)) {
          throw new Error('Deck is not Standard legal');
        }
      }
    }

}

