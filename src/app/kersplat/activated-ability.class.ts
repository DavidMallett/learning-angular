import { Permanent, Creature, Planeswalker } from '../core/permanent.component';
import { Cost } from './cost.class';
import { TheStack } from '../core/theStack';
import { GameInstance } from '../core/game-instance.class';
import { Target } from '../models/target.interface';
import { Logger } from '../util/logger.util';

export class ActivatedAbility {
  public cost: Cost;
  public type: string;
  public target: Target;
  public targets: Array<string>; // array of uuids
  public originId: string;
  // OriginId is a UUID of the object that originated the ability
  // TODO: Find way to reference any object in the GameInstance arbitrarily via uuid
  public effect: Function;

  public constructor(cost: Cost, originId: string, target: Target, effect: Function) {
    this.cost = cost;
    this.originId = originId;
    this.target = target;
    this.targets = this.target.targetIds;
    this.type = 'ActivatedAbility';
  }

  public changeStateOfOrigin(key: string, val: string): void {
    const theTargetId: string = this.originId;
    // Todo: pull object by ID from gameInstance, transform, validate/return
  }
}
