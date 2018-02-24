import { GameInstance } from './game-instance.class';
import { ActivatedAbility } from '../kersplat/activated-ability.class';
import { AbilityResolver } from '../kersplat/ability-resolver.class';
import { Trigger } from '../kersplat/trigger.class';
import { TriggerResolver } from '../kersplat/triggerResolver'
const _ = require('lodash');

export class TheStack {

  public static theStack: Array<any>;

  // things that go on the stack: spells, abilities, triggers
  public static push(obj: any): void {
    TheStack.theStack.push(obj);
  }

  public static resolve(): void {
    const thingToResolve: any = TheStack.theStack.pop();
    if (thingToResolve instanceof ActivatedAbility) {
      AbilityResolver.resolve(thingToResolve);
    } else if (thingToResolve instanceof Trigger) {
      TriggerResolver.resolve(thingToResolve);
    }
  }

}
