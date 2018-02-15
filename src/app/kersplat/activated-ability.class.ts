import { Permanent, Creature, Planeswalker } from '../core/permanent.component';
import { Cost } from './cost.class';
import { TheStack } from '../core/theStack';

export class ActivatedAbility {
  public cost: Cost;
  public type: string;
  public targets: Array<string>;
  public originId: string;
  public effect: Function;

  public constructor(cost: Cost, originId: string, targets: Array<string>, effect: Function) {
    this.cost = cost;
    this.originId = originId;
    this.targets = targets;
    this.type = 'ActivatedAbility';
  }
}
