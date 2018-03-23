import { ManaCost } from '../core/mana-cost.class';
import { Parser } from '../util/parser.util';
import { Permanent, Creature } from '../core/permanent.component';
import { Battlefield } from '../core/battlefield.class';
import { GameInstance } from '../core/game-instance.class';
import { Card } from '../card';
import { Zone } from '../models/zone.class';

const parser = new Parser();

const _ = require('lodash');

export class Cost {
  public tap?: boolean; // whether something has to Tap (with the tap symbol) as a cost
  public tapTarget?: Permanent;
  public manaCost?: ManaCost;
  public loyaltyCost?: string;
  public discardCost?: number; // whether one must discard cards as part of the cost
  public lifeCost?: number;
  public additionalCosts?: Array<any>; // i.e. 'remove a blue card in your hand from the game', 'sacrifice a vampire', etc
  public paid: boolean;

  // Players will draw from their own resources to create a Cost
  // 'descriptor' will be used to shortcut to particular Cost templates
  // for example, if 'taponly' then create a new Cost with this.tap === true
  public constructor(desc?: string) {
    // initialize the object
    this.manaCost = new ManaCost();
    this.loyaltyCost = null;
    this.discardCost = 0;
    this.lifeCost = 0;
    this.additionalCosts = [];
    this.paid = false;
    // parse the descriptor
    desc === 'taponly' ? this.tap = true : this.tap = false;
    Cost.parseCostDescriptor(desc, this);
  }


  // todo: see if this method actually fits in this class
  public static parseCostDescriptor(desc: string, theCost: Cost): Cost {
    const descArray: Array<string> = desc.split(':');
    // costs can be written as colon-separated strings and this method should parse them back into a Cost
    // i.e. "mana:3{U}{B}:life:2:cards:1"
    // let currentOp = 'starting';
    _.each(descArray, (str: string, index: number) => {
      // current idea: don't worry about when the iterator lands on the blocks of mana or numbers;
      // only perform actions when running into a keyword
      switch (str) {
        case 'mana':
          ManaCost.parseManaCost(descArray[index + 1]);
          break;
        case 'life':
          theCost.lifeCost += parseInt(descArray[index + 1], 10);
          break;
        case 'cards':
          theCost.discardCost += parseInt(descArray[index + 1], 10);
          break;
      }
    });

    return theCost;
  }

  public static newCost(obj: any): Cost {
    const result = new Cost();
    result.tap = obj.tap || false;
    result.manaCost = obj.manaCost || null;
    result.loyaltyCost = obj.loyaltyCost || null;
    result.discardCost = obj.discardCost || 0;
    result.lifeCost = obj.lifeCost || 0;
    result.additionalCosts = obj.additionalCosts || [];
    return result;
  }

  public pay(mana: string, life?: number, cards?: number, loyalty?: number): void {
    // todo: method for ensuring Cost is paid
  }

  public delve(casting: ManaCost, cards: Array<Card>): void {
    _.each(cards, (card: Card, index: number) => {
      if (card.zone === card.owner.yard) {
        // GameInstance.game().exile(card);
        // use another method for exiling
        casting.reduce();
      }
    });
  }

}
