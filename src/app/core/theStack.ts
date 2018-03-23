// import { GameInstance } from './game-instance.class';
import { ActivatedAbility } from '../kersplat/activated-ability.class';
import { AbilityResolver } from '../kersplat/ability-resolver.class';
import { Trigger } from '../kersplat/trigger.class';
import { TriggerResolver } from '../kersplat/triggerResolver';
// import { TriggerHelperService } from '../services/trigger-helper.service';
import { Logger } from '../util/logger.util';
import { Spell } from './spell.class';
// import { Battlefield } from './battlefield.class';
// import { Permanent, Creature, Land, Artifact, Enchantment, Planeswalker } from './permanent.component';
const _ = require('lodash');
// const ths = new TriggerHelperService();

// Honestly, the stack should probably just be a glorified interface

export class TheStack {

  public static theStack: Array<any>;

  // things that go on the stack: spells, abilities, triggers
  public static push(obj: any): void {
    TheStack.theStack.push(obj);
    Logger.gLog('new item pushed to the stack:\n' + obj.toString());
  }

  // generic method - not really used
  public static pop(): any {
    return TheStack.theStack.pop();
  }

  // todo: move to a different class
  public static counter(spellOrAbility: any): void {
    TheStack.remove(spellOrAbility);
    // ths.checkCondition(spellOrAbility, 'countered');
  }

  public static remove(obj: any): void {
    _.chain(_.find(TheStack.theStack, (thing: any, index: number) => {
      if (obj.uuid && thing.uuid && obj.uuid === thing.uuid) {
        return thing;
      } else if (obj.name && thing.name && obj.name === thing.name) {
        return thing;
      } // else if (obj.)
      // what other things can we search on?
      /* types of objects we are expecting:
          Permanent { Creature, Artifact, Enchantment, Planeswalker, Land}
          Spell {Instant, Sorcery}
          ActivatedAbility
          Trigger
          TriggeredAbility (if it differs from above)
      */
    })).value()
      .then((theObj: any) => {
        _.remove(TheStack.theStack, theObj);
      });
  }

  // public static resolve(): void {
  //   const thingToResolve: any = TheStack.pop();
  //   if (thingToResolve instanceof ActivatedAbility) {
  //     AbilityResolver.resolve(thingToResolve);
  //   } else if (thingToResolve instanceof Trigger) {
  //     TriggerResolver.resolve(thingToResolve);
  //   } else if (Logger.getObjectType(thingToResolve) === 'Spell') {
  //     TheStack.resolveSpell(thingToResolve);
  //   } else if (Logger.getObjectType(thingToResolve) === 'Permanent') {
  //     TheStack.resolvePermanent(thingToResolve);
  //   }
  // }

  public static resolveSpell(spell: Spell): void {
    // todo: logic for resolving spells off the stack
  }

  // this should be in another class
  // public static resolvePermanent(perm: Permanent): void {
  //   const bf: Battlefield = GameInstance.bf();
  //   bf.register(perm);
  // }
}
