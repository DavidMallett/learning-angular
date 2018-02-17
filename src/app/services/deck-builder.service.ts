import { Card } from '../models/card.interface';
import { DeckInterface } from '../models/deck.interface';
import { Deck } from '../deck.component';
import { CardInfoService } from './card-info.service';
const mtg = require('mtgsdk');
const fs = require('fs');
const _ = require('lodash');

export class DeckBuilderService {

  public readDeckFromTxt(filePath: string): Deck {
    fs.readFile(filePath, (err, data) => {
      if (err) { throw err; }
      const result: Deck = ;
      const arr = data.split('\n');
      // each value in array is of form '3x Fatal Push'
      _.each(arr, (s: string) => {
        for (let i = 0; i < parseInt(s.charAt(0)); i++) {

        }
      })
    })
  }

}
