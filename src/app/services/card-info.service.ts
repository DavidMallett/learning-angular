import { CardInterface } from '../models/card.interface';
import { Card } from '../card';
const mtg = require('mtgsdk');
const _ = require('lodash');
const fs = require('fs');

export class CardInfoService {

  public findCardByName(name: string): Card {
    //  const toReturn: Array<Card> = [];
    return mtg.card.where({ 'name': name })
      .then((cards: Array<Card>) => {
        if (cards.length === 0) {
          throw new Error('Card with name ' + name + ' not found');
        } else if (cards.length === 1) {
          return cards[0];
        } else { // > 1 Card in the array
          return cards[_.findIndex(cards, (c) => c.name === name )];
        }
      });
  }

  public findCardByKey(keys: Array<string>): Card | Array<Card> {
    const searchObj = {};
    return _.chain(_.each(keys, (pair: string) => {
      // note: each string is a key/value pair in the format key:value
      const kv: Array<string> = pair.split(':');
      // kv[0] == key, kv[1] == value
      _.set(searchObj, 'searchObj.' + kv[0], kv[1]);
    })).value().then((params) => {
      return mtg.card.where(params)
        .then((cards: Array<Card>) => {
          if (cards.length === 1) { return cards[0]; } else
          if (cards.length === 0) { throw new Error('could not find card with those properties'); } else
          if (cards.length > 1) { return cards; }
        });
    });
  }

  public writeCard(card: Card): void {
    fs.appendFile(card.name + '.json', card, (err) => {
      if (err) { throw err; }
      // Card written to file
    });
  }

}
