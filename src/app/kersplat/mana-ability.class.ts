import { ActivatedAbility } from './activated-ability.class';
import { Cost } from './cost.class';
import { Target } from '../models/target.interface';
import { Player } from '../player';
import { Source } from '../models/source';

// mana abilities are generally considered special actions and don't use the stack / aren't targeted

export class ManaAbility extends ActivatedAbility {
  // inherited from activatedAbility
  public id: string;
  public cost: Cost;
  public type: string;
  public target: Target;
  public source: Source;
  public effect: Function;

  // not in ActivatedAbility
  public amount: number;
  public color: string;

  constructor(source: Source, cost: Cost, basic?: boolean, color?: string) {
    super(source, cost);
    this.target = new Target('self');
    if (basic) {
      this.cost = new Cost('taponly');
      this.amount = 1;
      this.color = color || 'C';
    }
  }

  public setManaProducingProps(color: string, amount: number) {
    this.color = color;
    this.amount = amount;
  }

  public makeMana(cost: Cost): string {
    let toReturn = '';
    if (cost === this.cost) {
      // consciously not using _ here
      for (let i = 0; i < this.amount; i++) {
        toReturn += this.color;
      }
      return toReturn;
    } else {
      throw new Error('did not pay the correct cost');
    }
  }


}
