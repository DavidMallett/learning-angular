import { CardInterface } from '../models/card.interface';
import { DeckInterface } from '../models/deck.interface';
import { Deck } from '../deck.component';
import { CardInfoService } from './card-info.service';
import { Injectable } from '@angular/core';
const mtg = require('mtgsdk');
const fs = require('fs');
const _ = require('lodash');
const cis = new CardInfoService();

@Injectable()
export class DeckBuilderService {

  public readDeckFromTxt(name: string, filePath: string): Deck {
    return _.chain(fs.readFile(filePath, (err, data) => {
      if (err) { throw err; }
      const result: Deck = new Deck([], name);
      const arr = data.split('\n');
      // each value in array is of form '3x Fatal Push'
      _.each(arr, (s: string) => {
        const quant = parseInt(s.charAt(0), 10);
        _.chain(_.dropWhile(s, (c: string) => {
          return !isNaN(parseInt(c, 10)) || c === 'x' || c === ' ';
        })
        .trim()
        .value())
        .then((theCardName: string) => {
          for (let i = 0; i < quant; i++) {
            result.library.push(cis.findCardByName(theCardName));
            if (i === quant - 1) {
              return result;
            }
          }
        });
      });
    })).value().then((theDeck: Deck) => {
      return theDeck;
    });
  }

}
