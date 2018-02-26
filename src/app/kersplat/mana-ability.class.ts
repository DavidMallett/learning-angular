import { ActivatedAbility } from './activated-ability.class';
import { Cost } from './cost.class';
import { Target } from '../models/target.interface';

// mana abilities are generally considered special actions and don't use the stack / aren't targeted

export class ManaAbility extends ActivatedAbility {
  public cost: Cost;
  public type: string;
  public target: Target;
  public targets: Array<string>;
  public source: string;
  public amount: number;
}
