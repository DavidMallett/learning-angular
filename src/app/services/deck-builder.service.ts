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

  public readDeckFromJson(name: string, path: string): Deck {
    const json = require(path);
    const result: Deck = new Deck([], name);
    // const creatures = json.creatures || {};
    // const lands = json.lands || {};
    // const instants = json.instants || {};
    // const sorceries = json.sorceries || {};
    // const spells = json.spells || {};
    // const artifacts = json.artifacts || {};
    // const enchantments = json.enchantments || {};
    // const pw = json.planeswalkers || {};

    this.addCardsToDeck(json.creatures, result);
    this.addCardsToDeck(json.lands, result);
    this.addCardsToDeck(json.instants, result);
    this.addCardsToDeck(json.sorceries, result);
    this.addCardsToDeck(json.spells, result);
    this.addCardsToDeck(json.artifacts, result);
    this.addCardsToDeck(json.enchantments, result);
    this.addCardsToDeck(json.planeswalkers, result);

    return result;
  }

  public addCardsToDeck(cards: any, deck: Deck): void {
    if (!(cards === {} || cards === null || cards === undefined)) {
      _.each(cards, (quant: number, key: string) => {
        for (let i = 0; i < quant; i++) {
          deck.addCard(cis.findCardByName(key));
        }
      });
    }
  }

}
