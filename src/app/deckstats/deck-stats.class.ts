import { Card } from '../card';
import { Deck } from '../deck.component';
import * as _ from 'lodash';
// const cantripList = require('../services/lists/cantrips.json');
// const theCantrips: Array<string> = cantripList.cantrips;

const theCantrips: Array<string> = [
  'Opt',
  'Ponder',
  'Preordain',
  'Brainstorm',
  'Serum Visions',
  'Sleight of Hand',
  'Gitaxian Probe',
  'Mishra\'s Bauble'
];


export class DeckStats {
  public deck: Deck;
  public numLands: number;
  public numCreatures: number;
  public numNonCreatureSpells: number;
  public numCantrips: number;

  public constructor(deck: Deck) {
    this.deck = deck;
    this.basicEvaluate();
  }

  public basicEvaluate(): void {
    let lands = 0;
    let creatures = 0;
    let ncsps = 0;
    let cantrips = 0;
    _.each(this.deck.library, (card: Card, index: number) => {
      card.type.includes('creature') ? creatures++ : creatures += 0;
      card.type.includes('land') ? lands++ : lands += 0;
      (card.type.includes('instant') ||
        card.type.includes('sorcery') ||
        card.type.includes('planeswalker') ||
        (card.type.includes('enchantment') && !card.type.includes('creature')) ||
        (card.type.includes('artifact') && !card.type.includes('creature'))
      ) ? ncsps++ : ncsps += 0;
      theCantrips.indexOf(card.name) > -1 ? cantrips++ : cantrips += 0;
    });
    this.numLands = lands;
    this.numCreatures = creatures;
    this.numNonCreatureSpells = ncsps;
    this.numCantrips = cantrips;
  }

  public sampleHand(): void {
    this.deck.shuffle();
    const hand: Array<Card> = new Array<Card>();
    for (let i = 0; i < 7; i++) {
      hand.push(this.deck.draw());
    }
    console.log(hand.toString());
  }


}
