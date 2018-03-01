import { GameInstance } from './game-instance.class';
import { ActivatedAbility } from '../kersplat/activated-ability.class';
import { AbilityResolver } from '../kersplat/ability-resolver.class';
import { Trigger } from '../kersplat/trigger.class';
import { TriggerResolver } from '../kersplat/triggerResolver';
import { Logger } from '../util/logger.util';
import { Spell } from './spell.class';
import { Battlefield } from './battlefield.class';
import { Permanent, Creature, Land, Artifact, Enchantment, Planeswalker } from './permanent.component';
const _ = require('lodash');

export class TheStack {

  public static theStack: Array<any>;

  // things that go on the stack: spells, abilities, triggers
  public static push(obj: any): void {
    TheStack.theStack.push(obj);
    Logger.gLog('new item pushed to the stack:\n' + obj.toString());
  }

  public static resolve(): void {
    const thingToResolve: any = TheStack.theStack.pop();
    if (thingToResolve instanceof ActivatedAbility) {
      AbilityResolver.resolve(thingToResolve);
    } else if (thingToResolve instanceof Trigger) {
      TriggerResolver.resolve(thingToResolve);
    } else if (Logger.getObjectType(thingToResolve) === 'Spell') {
      TheStack.resolveSpell(thingToResolve);
    } else if (Logger.getObjectType(thingToResolve) === 'Permanent') {
      TheStack.resolvePermanent(thingToResolve);
    }
  }

  public static resolveSpell(spell: Spell): void {
    // todo: logic for resolving spells off the stack
  }

  public static resolvePermanent(perm: Permanent): void {
    const bf: Battlefield = GameInstance.bf();
    bf.register(perm);
  }
}
