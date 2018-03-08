import { ActivatedAbility } from './activated-ability.class';
import { Cost } from './cost.class';
import { Target } from '../models/target.interface';
import { Player } from '../player';
import { Source } from '../models/source';
import * as _ from 'lodash';

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
  public colors?: Array<string>;
  public isManaAbility: boolean;

  constructor(source: Source, cost: Cost, basic?: boolean, color?: string) {
    super(source, cost);
    this.target = new Target('self');
    if (basic) {
      this.cost = new Cost('taponly');
      this.amount = 1;
      this.color = color || 'C';
      this.colors.push(this.color);
    }
    this.isManaAbility = true;
  }

  public static constructFromObject(obj: any): ManaAbility {
    const abil: ManaAbility = new ManaAbility(obj.source, obj.cost, false, obj.color);
    abil.setManaProducingProps(obj.colors, obj.amount);
    return abil;
  }

  public setManaProducingProps(colors: Array<string>, amount: number) {
    this.colors = colors;
    this.amount = amount;
  }

  public canMake(arr: Array<string>): void {
    this.colors = arr;
  }

  public possibleManaOutput(): Array<string> {
    const result: Array<string> = [];
    _.each(this.colors, (color: string, index: number) => {
      const partial = '';

      // deliberate for loop
      for (let i = 0; i < this.amount; i++) {
        partial.concat(color);
      }
      result.push(partial);
      if (this.amount > 1 && this.amount === this.colors.length) {
        result.push(_.join(this.colors, ''));
      }
    });
    return result;
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
