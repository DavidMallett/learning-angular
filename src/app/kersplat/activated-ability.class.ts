import { Permanent, Creature, Planeswalker } from '../core/permanent.component';
import { Cost } from './cost.class';
import { TheStack } from '../core/theStack';
import { GameInstance } from '../core/game-instance.class';
import { Target } from '../models/target.interface';
import { Logger } from '../util/logger.util';
import { Source } from '../models/source';
import { ManaAbility } from './mana-ability.class';

export class ActivatedAbility {
  public id: string;
  public cost: Cost;
  public type: string;
  public target: Target;
  public targets?: Array<Target>; // array of uuids
  public source: Source;
  public effect: Function;
  public isManaAbility: boolean;

  public constructor(source: Source, cost: Cost, target?: Target, targets?: Array<Target>) {
    this.id = source.type + source.id;
    this.source = source;
    this.cost = cost;
    this.target = target || new Target('self', source.reference);
    this.targets = targets || []; // only for abilities with multiple targets
    this.isManaAbility = false;
  }

  public manaAbil(): boolean {
    return (this instanceof ManaAbility);
  }

  public activate(costPaid: Cost): void {
    
  }

  public convertToManaAbility(): ManaAbility {
    const manaAbil: any = {
      'id': this.id,
      'cost': this.cost,
      'type': this.type,
      'target': this.target,
      'source': this.source,
      'effect': this.effect,
      'colors': this.effect[0].split(''),
      'color': this.effect[0],
      'amount': this.effect[1],
      'isManaAbility': true
    };

    return ManaAbility.constructFromObject(manaAbil);
  }

  // public constructor(cost: Cost, target?: Target, effect?: Function) {
  //   this.cost = cost;
  //   this.originId = '';
  //   this.target = target || null;
  //   this.targets = this.target.targetIds || null;
  //   this.type = 'ActivatedAbility';
  //   this.effect = effect || null;
  // }

  public changeSource(key: string, val: string): void {
    // Todo: pull object by ID from gameInstance, transform, validate/return
  }
}
