const _ = require('lodash');

export class Cost {
  public tap: boolean; // whether something has to Tap (with the tap symbol) as a cost
  public manaCost?: string;
  public loyaltyCost?: string;
  public discardCost?: number; // whether one must discard cards as part of the cost
  public lifeCost?: number;
  public additionalCosts?: Array<any>; // i.e. 'remove a blue card in your hand from the game', 'sacrifice a vampire', etc

  // Players will draw from their own resources to create a Cost
  public constructor(costs: Cost) {
    this.tap = costs.tap;
    this.manaCost = costs.manaCost || '0';
    this.loyaltyCost = costs.loyaltyCost || null;
    this.discardCost = costs.discardCost || 0;
    this.lifeCost = costs.lifeCost || 0;
    this.additionalCosts = costs.additionalCosts || [];
  }

}
