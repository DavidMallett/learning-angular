import { ManaCost } from '../core/mana-cost.class';
import { Parser } from '../util/parser.util';

const _ = require('lodash');

export class Cost {
  public tap?: boolean; // whether something has to Tap (with the tap symbol) as a cost
  public manaCost?: ManaCost;
  public loyaltyCost?: string;
  public discardCost?: number; // whether one must discard cards as part of the cost
  public lifeCost?: number;
  public additionalCosts?: Array<any>; // i.e. 'remove a blue card in your hand from the game', 'sacrifice a vampire', etc

  // Players will draw from their own resources to create a Cost
  // 'descriptor' will be used to shortcut to particular Cost templates
  // for example, if 'taponly' then create a new Cost with this.tap === true
  public constructor(desc?: string) {
    desc === 'taponly' ? this.tap = true : this.tap = false;
    this.manaCost = new ManaCost();
    this.loyaltyCost = null;
    this.discardCost = 0;
    this.lifeCost = 0;
    this.additionalCosts = [];
  }


}
