import { Permanent, Creature, Planeswalker } from './permanent.component';
import { Cost } from '../kersplat/cost.class';
import { TheStack } from './theStack';
import { GameInstance } from './game-instance.class';
import { Target } from '../models/target.interface';
import { Logger } from '../util/logger.util';
import { Parser } from '../util/parser.util';
import * as _ from 'lodash';
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


  public floatingMana(mc: ManaCost): void {
    // don't remember what I was trying to do here...
  }

}
