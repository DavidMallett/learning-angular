import { Injectable } from '@angular/core';
import { CardInterface } from '../models/card.interface';
import { Card } from '../card';
const mtg = require('mtgsdk');
const _ = require('lodash');
const fs = require('fs');

@Injectable()
export class CardInfoService {

  private writeCardToCache(card: Card): void {
    fs.appendFile('../../../cache/' + _.kebabCase(card.name) + '.json', card, (err) => {
      if (err) { throw err; }
      console.log('card written to cache');
      fs.appendFile('../../../cache/index.txt', card.name + '\n', (err2) => {
        if (err2) { throw err2; }
        console.log('card name written to index');
      });
    });
  }

  private checkCacheForCard(cardName: string): Card {
    return fs.open('../../../cache/index.txt', 'r', (err, data: string) => {
      if (err) { throw err; }
      const names = data.split('\n');
      return _.find(names, (n: string) => {
        return n === cardName;
      }).then((theName: string) => {
        if (theName === undefined) {
          throw new Error('name not found in cache');
        } else {
          const path: string = '../../../cache/' +  _.kebabCase(theName) + '.json';
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
      console.log('checking cache for card');
      this.checkCacheForCard(name);
    } catch (e) {
      console.log('card not found in cache');
      // get the card from mtgsdk
      return mtg.card.where({ 'name': name })
        .then((cards: Array<Card>) => {
          if (cards.length === 0) {
            throw new Error('Card with name ' + name + ' not found');
          } else if (cards.length === 1) {
            this.writeCardToCache(cards[0]);
            return cards[0];
          } else { // > 1 Card in the array
            const c: Card = cards[_.findIndex(cards, (card: Card) => card.name === name)];
            this.writeCardToCache(c);
            return c;
          }
        });
    }
  }

  // a helper function to pull all the cards in a set and write them to the cache
  public populateCacheWithCards(set: string): void {
    // validate that the set is a real Magic set
    mtg.set.find('MMA')
      .then(result => {
        if (!result) { throw new Error('failed to get a set with that name'); }
        const theSet: string = result.set.name;
        mtg.card.all({ set: theSet })
          .on('data', card => {
            console.log(card.name);
            // this should automatically write to the cache
            const theCard: Card = this.findCardByName(card.name);
          });
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
