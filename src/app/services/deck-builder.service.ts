import { CardInterface } from '../models/card.interface';
import { DeckInterface } from '../models/deck.interface';
import { Deck } from '../deck.component';
import { Card } from '../card';
import { CardInfoService } from './card-info.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import * as path from 'path';
import * as mtg from 'mtgsdk';
import * as fs from 'fs';
import * as json from 'comment-json';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
const cis = new CardInfoService();
/**
 *
 * TODAY I LEARNED THAT:
 *
 * YOU CANNOT USE FS IN THE BROWSER
 *
 *
 */
declare var require: any;

interface DeckList {
  creatures: any;
  lands: any;
  artifacts: any;
  enchantments: any;
  planeswalkers: any;
  instants: any;
  sorceries: any;
  spells: any;
}


@Injectable()
export class DeckBuilderService {

  constructor(private http?: HttpClient) {
    this.http = http;
  }

  public readDeckFromBrowser(name: string, decklist: string): Deck {
    const result = new Deck([], name);
    const arr = decklist.split('\n');
    _.each(arr, (line: string, index: number) => {
      const quant: number = parseInt(line.charAt(0), 10);
      const cardName: string = line.substr(2).trim();
      for (let i = 0; i < quant; i++) {
        result.addCard(cis.findCardByName(cardName));
      }
    });
    return result;
  }

  public readDeckFromTxt(name: string, filePath: string): Deck {
    /**
     * Deck must be in the format:
     * 4 Delver of Secrets
     * 4 Kiln Fiend
     * 4 Nivix Cyclops
     * 4 Ponder
     * 4 Preordain
     * 4 Counterspell
     * 4 Vapor Snag
     * 2 Gush
     * 16 Island
     * etc
     */
    const deck: Deck = new Deck([], name);
    fs.readFile(filePath, (err, data) => {
      const arr: Array<string> = data.toString().split('\n');
      _.each(arr, (line: string, index: number) => {
        const quant: number = parseInt(line.charAt(0), 10);
        // for now we will do this in a ghetto way that requires all cards
        // to have a quant > 0 and < 9.
        const cardName = line.substr(2).trim();
        for (let i = 0; i < quant; i++) {
          deck.addCard(cis.findCardByName(cardName));
        }
      });
    });
    return deck;
  }

  // public readDeckFromTxt(name: string, filePath: string): Deck {
  //   return _.chain(fs.readFile(filePath, (err, data) => {
  //     if (err) { throw err; }
  //     const result: Deck = new Deck([], name);
  //     const arr = data.toString().split('\n');
  //     // each value in array is of form '3x Fatal Push'
  //     _.each(arr, (s: string) => {
  //       const quant = parseInt(s.charAt(0), 10);
  //       _.chain(_.dropWhile(s, (c: string) => {
  //         return !isNaN(parseInt(c, 10)) || c === 'x' || c === ' ';
  //       })
  //       .trim()
  //       .value())
  //       .then((theCardName: string) => {
  //         // deliberate for loop because it's the most efficient way to perform this operation
  //         const theCard: Card = cis.findCardByName(theCardName);
  //         for (let i = 0; i < quant; i++) {
  //           result.library.push(theCard);
  //           if (i === quant - 1) {
  //             return result;
  //           }
  //         }
  //       });
  //     });
  //   })).value().then((theDeck: Deck) => {
  //     return theDeck;
  //   });
  // }

  public writeDeckToFile(name: string, deckStr: string): string { // return path to the file
    // 'deckStr' must be a string object representing a Deck
    /* Like so:
    *   4 Toolcraft Exemplar
    *   4 Heart of Kiran
    *   4 Fatal Push
    *   2 Chandra, Torch of Defiance
    *   etc
    * */
    const theName: string = _.kebabCase(name); // || deckStr.split('\n')[0];
    const thePath: string = path.resolve('../../../decks/', theName + '.json');

    fs.appendFile(thePath, deckStr, (err) => {
      if (err) {
        return err;
      }
    });

    return thePath;

  }

  // public getJSON(thePath: string): Observable<any> {
  //   return this.http.get(thePath)
  //     .map((res: Response) => res.json())
  //     .catch((error: Error) => console.log(error));
  // }



  // vvv THIS METHOD won't work in a service because you CANNOT use fs in the browser
  //
  // public readDeckFromJson(name: string, filePath: string): Deck {
  //   // todo: unit test for this
  //   const theJson: any = json.parse(fs.readFileSync(filePath).toString());
  //   // const json = this.http.get(filePath);
  //   // const json: any = require(filePath);
  //   const result: Deck = new Deck([], name);
  //   // json.subscribe((data: DeckList) => {

  //       // .map((res: Response) => {
  //       //   return res.json();
  //       // })
  //       // .catch((error) => {
  //       //   throw new Error(error);
  //       // });
  //     // const json = require(filePath);
  //     // const creatures = json.creatures || {};
  //     // const lands = json.lands || {};
  //     // const instants = json.instants || {};
  //     // const sorceries = json.sorceries || {};
  //     // const spells = json.spells || {};
  //     // const artifacts = json.artifacts || {};
  //     // const enchantments = json.enchantments || {};
  //     // const pw = json.planeswalkers || {};

  //   this.addCardsToDeck(theJson.creatures, result);
  //   this.addCardsToDeck(theJson.lands, result);
  //   this.addCardsToDeck(theJson.instants, result);
  //   this.addCardsToDeck(theJson.sorceries, result);
  //   this.addCardsToDeck(theJson.spells, result);
  //   this.addCardsToDeck(theJson.artifacts, result);
  //   this.addCardsToDeck(theJson.enchantments, result);
  //   this.addCardsToDeck(theJson.planeswalkers, result);
  //   // });

  //   return result;

  // }

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
