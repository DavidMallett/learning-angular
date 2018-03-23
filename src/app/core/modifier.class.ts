import { Target } from '../models/target.interface';
import { Card } from '../card';
import { GameInstance } from './game-instance.class';
import { Spell, Instant, Sorcery } from '../core/spell.class';
import { Permanent, Creature, Land, Planeswalker, Artifact, Enchantment } from './permanent.component';
const theKeywords = require('../keywords.json').keywords;
const _ = require('lodash');
const uuid = require('uuid/v4');

// This class exists to apply any kind of effect to an object
// for example, "+1/+1 until end of turn"
// or, "has flying as long as it is attacking"

export class Modifier {
  public id: string;
  public keywords?: Array<string>; // keywords to add
  public condition?: string;
  public effects?: Array<string>; // additional effects not covered by keywords i.e. 'creatures without flying can't block'
  public duration?: string; // condition under which the modifier expires; vvv
  // for example, 'eot', 'tillThisDies', 'forever', or a function
  // "At the beginning of your end step, if you control no artifacts, sacrifice ____"
  public hostType?: string; // Type of object doing the modifying, i.e. 'instant' 'activatedAbility' etc
  public target: Target; // will eventually be a target object; for now, 'self', 'all', a uuid, etc
  // update: ^^ is now a Target object with properties targetType, targetIds, and reference

  public constructor(modifier?: () => void) {
    // properties will be set by the function we pass into the constructor
    if (!modifier) {
      // set up a modifier template if nothing is given to the constructor
      this.hostType = '';
      this.keywords = [];
      this.condition = '';
      this.effects = [];
      this.duration = '';
      this.target = null;
      this.id = uuid();
    } else {
      modifier();
    }
  }
  // public constructor(type: string, target: Target, duration: string, effects?: Array<string>) {
  //   this.id = _.join([type, target.targetType, target.targetId], ':');
  //   this.hostType = type;
  //   this.duration = duration;
  //   this.target = target;
  //   this.effects = effects || [];
  //   this.keywords = [];
  // }

  // ID should be composed of host type, targetType, and targetId joined by ':'
  // for example, if I cast Tragic Slip on some elf, then it would be:
  // instant:creature:creature.uuid()
  public setId(): void {
    this.id = _.join(this.hostType, this.target.targetType, this.target.targetId);
  }

  public setCondition(cond: string): void {
    this.condition = cond;
  }

  public addKeyword(word: string): void {
    if (word in theKeywords) {
      this.keywords.push(word);
    } else {
      throw new Error('that is not a recognized keyword');
    }
  }
  public checkExpiration(): void {
    // todo: check if end condition for effect is satisfied

    // if (this.duration === 'ended' || )
    // switch (this.condition) {
    //   case null:
    //     break;
    //   case 'eot':
    //     if (GameInstance.game().phase.currentPhase === 'endStep') {
    //       this.expire();
    //     }
    //     break;
    //   case ''
    // }
  }

  public expire(): void {
    // todo: logic to remove the modifier
  }

  public applyToCard(card: Card): void {
    _.each(this.keywords, (keyword: string, index: number) => {
      card.keywords.push(keyword);
    });
    _.each(this.effects, (eff: string, index2: number) => {
      // todo: figure this out if necessary
    });
  }

  public applyToPermanent(perm: Permanent): void {
    // todo: logic to apply the modifier to a permanent, player, or spell
    perm.addModifier(this);
  }

  public applyToSpell(sp: Spell): void {
    sp.addModifier(this);
  }

}
