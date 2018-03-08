import { Permanent, Creature, Land, Artifact, Enchantment, Planeswalker } from './permanent.component';
import { TheStack } from './theStack';
import { GameInstance } from './game-instance.class';
import { Phase } from '../phase.class';
import { Logger } from '../util/logger.util';
import { Player } from '../player';
import { Card } from '../card';
import * as uuid from 'uuid';
const _ = require('lodash');

export class Graveyard {
  public cards: Array<Card>;
  public owner: Player; // player whose Graveyard this is;

  public constructor() {
    this.cards = [];
  }

  // put a card in the graveyard
  public push(card: Card): void {
    this.cards.push(card);
  }

  public toString(): string {
    let resultStr = '------\nGRAVEYARD:\n';
    _.each(this.cards, (c: Card) => {
      resultStr += c.toString();
    });
    return resultStr;
  }
}
