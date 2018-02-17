import { CardInterface } from '../models/card.interface';
import { Card } from '../card';
const mtg = require('mtgsdk');
const _ = require('lodash');
const fs = require('fs');

export class CardInfoService {

  private writeCardToCache(card: Card): void {
    fs.appendFile('../../cache/' + _.kebabCase(card.name) + '.json', card, (err) => {
      if (err) { throw err; }
      console.log('card written to cache');
      fs.appendFile('../../cache/index.txt', card.name + '\n', (err2) => {
        if (err2) { throw err2; }
        console.log('card name written to index');
      });
    });
  }

  private checkCacheForCard(cardName: string): Card {
    return fs.open('../../cache/index.txt', 'r', (err, data: string) => {
      if (err) { throw err; }
      const names = data.split('\n');
      return _.find(names, (n: string) => {
        return n === cardName;
      }).then((theName: string) => {
        if (theName === undefined) {
          throw new Error('name not found in cache');
        } else {
          const path: string = '../../cache/' +  _.kebabCase(theName) + '.json';
          fs.open(path, 'r', (err2, cardToReturn: Card) => {
            if (err2) { throw err2; }
            return cardToReturn;
          });
        }
      }); // .then((result: Card) => {
      //   return result;
      // });
    });
  }

  public findCardByName(name: string): Card {
    // check the cache to see if we have the card locally
    try {
      this.checkCacheForCard(name);
    } catch (e) {
      console.log('card not found in cache');
      // get the card from mtgsdk
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
