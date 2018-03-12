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
    parser.parseCostDescriptor(desc, this);
  }

  // public static newCost(obj: any): Cost {
  //   const result = new Cost();
  //   result.manaCost = obj.manaCost || null;
  //   result.loyaltyCost = obj.loyaltyCost || null;
  // }

  public pay(mana: string, life?: number, cards?: number, loyalty?: number): void {
    // todo: method for ensuring Cost is paid
  }

  public delve(casting: ManaCost, cards: Array<Card>): void {
    _.each(cards, (card: Card, index: number) => {
      if (card.zone === card.owner.yard) {
        GameInstance.game().exile(card);
        casting.reduce();
      }
    });
  }

}
