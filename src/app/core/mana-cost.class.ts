import { Permanent, Creature, Planeswalker } from './permanent.component';
import { Cost } from '../kersplat/cost.class';
import { TheStack } from './theStack';
import { GameInstance } from './game-instance.class';
import { Target } from '../models/target.interface';
import { Logger } from '../util/logger.util';
import { Parser } from '../util/parser.util';
// import * as _ from 'lodash';
const _ = require('lodash');
const parser = new Parser();


export class ManaCost {
  public genericCost?: number;
  public colorlessCost?: number;
  public whiteCost?: number;
  public blueCost?: number;
  public redCost?: number;
  public blackCost?: number;
  public greenCost?: number;
  public phyrexianLifeLoss?: number;
  public symbols?: Array<string>;

  // public conditionalCost? // "spend only mana produced by artifacts to cast this spell"

  public constructor() {
    // just initialize a POJO and build up the object in the parse loop
    this.genericCost = 0;
    this.colorlessCost = 0;
    this.whiteCost = 0;
    this.blackCost = 0;
    this.blueCost = 0;
    this.greenCost = 0;
    this.redCost = 0;
    this.phyrexianLifeLoss = 0;
    this.symbols = [];
  }

  // this method should mutate the first argument by subtracting the second
  // designed to work with the Player's manaPool Array<string>
  public static subtract(first: Array<string>, second: ManaCost): void {
    const availableMana: ManaCost = parser.parseTokenArray(first);
    availableMana.genericCost -= second.genericCost;
    availableMana.colorlessCost -= second.colorlessCost;
    availableMana.whiteCost -= second.whiteCost;
    availableMana.blackCost -= second.blackCost;
    availableMana.blueCost -= second.blueCost;
    availableMana.greenCost -= second.greenCost;
    availableMana.redCost -= second.redCost;
    _.each(availableMana, (val: number, key: string) => {
      if (val < 0) {
        throw new Error('not enough mana to cast spell');
      }
    });
    // that's all; this is a check to ensure that more mana wasn't deducted than was in the mana pool
  }

  public converted(): number {
    // returns the CMC of a manaCost
    return this.genericCost +
      this.colorlessCost +
      this.whiteCost +
      this.blackCost +
      this.greenCost +
      this.blueCost +
      this.redCost;
  }

  // simple reusable method to reduce generic requirement by 1
  public reduce(): void {
    this.genericCost < 1 ? this.genericCost = 0 : this.genericCost -= 1;
  }

  public toSymbols(): Array<string> {
    // account for case in which genericCost is 2 digits

    // let symbols = this.toString().split('');

    if (this.genericCost > 9) {
      const symbols = _.drop(this.toString().split(''), 2);
      symbols.unshift(this.genericCost.toString());
      return this.symbols = symbols;
    } else {
      return this.symbols = this.toString().split('');
    }

  }

  public toString(): string {
    let result = '';
    if (this.genericCost > 0) {
      result += this.genericCost.toString();
    }
    if (this.whiteCost > 0) {
      result += _.padEnd('', this.whiteCost, 'W');
    }
    if (this.blackCost > 0) {
      result += _.padEnd('', this.blackCost, 'B');
    }
    if (this.redCost > 0) {
      result += _.padEnd('', this.redCost, 'R');
    }
    if (this.blueCost > 0) {
      result += _.padEnd('', this.blueCost, 'U');
    }
    if (this.greenCost > 0) {
      result += _.padEnd('', this.greenCost, 'G');
    }
    if (this.colorlessCost > 0) {
      result += _.padEnd('', this.colorlessCost, 'C');
    }
    // this is just the mana cost - phyrexian mana is a life cost
    return result;
  }

  public canBeCastBy(pool: Array<Array<string>>): boolean {
    // todo: come up with a better way to write this method
    // perhaps using recursion?
    const symbols: Array<string> = this.toSymbols();
    const poolSymbols: Array<string> = [];
    // if (this.converted() > pool.
    _.each(symbols, (char: string, index: number) => {
      _.each(pool, (land: Array<string>, index2: number) => {
        // remember how the pool looks. If I have Adarkar Wastes, Swamp, and City of Brass then pool is:
        // [ [C, U, W], [B], [U, W, B, R, G] ]
        // note to self: we have to account for stuff like Ancient Tomb that produces CC...

        // initial (seemingly not great) idea:
        // iterate through pool and make a list of all possible combinations of mana that can be made
        // then check to see if this.toSymbols is in the array of possible results

        // second idea: count the number of each symbol in this.symbols
        // then, count the number of each symbol in the pool.
        if (land.includes(char)) {
          poolSymbols.push(pool.splice(index2, 1, [''])[0][land.indexOf(char)]);
        }

        // _.each(land, (mana: string, index2: number)q
      });
    });

    return poolSymbols === symbols;

  }

  public floatingMana(mc: ManaCost): void {
    // don't remember what I was trying to do here...
  }

}
