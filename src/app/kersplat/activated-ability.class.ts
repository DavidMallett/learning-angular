import { Permanent, Creature, Planeswalker } from '../core/permanent.component';
import { Cost } from './cost.class';

export class ActivatedAbility {
  public cost: Cost;
  public target?: string;

}