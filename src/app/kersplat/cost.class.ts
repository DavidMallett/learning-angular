const _ = require('lodash');

export class Cost {
  public tap: boolean;
  public manaCost?: string;
  public loyaltyCost?: string;
  public discardCost?: number;
  public lifeCost?: number;
  public additionalCosts: Array<any>;

  public constructor(costs: Cost) {
    this.tap = costs.tap;
    this.manaCost = costs.manaCost || '0';
    this.loyaltyCost = costs.loyaltyCost || null;
    this.discardCost = costs.discardCost || 0;
    this.lifeCost = costs.lifeCost || 0;
    this.additionalCosts = costs.additionalCosts || [];
  }

}
