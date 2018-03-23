import { Card } from '../card';
import { CardInterface } from '../models/card.interface';
import { Permanent, Creature, Planeswalker } from '../core/permanent.component';
import { GameInstance } from '../core/game-instance.class';
import { Battlefield } from '../core/battlefield.class';
import { Player } from '../player';
import { ActivatedAbility } from '../kersplat/activated-ability.class';
import { Logger } from '../util/logger.util';
import { Modifier } from './modifier.class';
import { Target } from '../models/target.interface';
import { Zone } from '../models/zone.class';
import { TheStack } from '../core/theStack';
import { TriggerHelperService } from '../services/trigger-helper.service';
import * as uuid from 'uuid';
import { ManaCost } from './mana-cost.class';
// import * as _ from 'lodash';
const _ = require('lodash');
const uuidv4 = require('uuid/v4');
const ths = new TriggerHelperService();

export class Spell {
  // required
  public uuid: string;
  public name: string;
  public types: Array<string>; // i.e. ['tribal', 'instant']
  public type: string;
  public cmc: number;
  public owner: Player;
  public controller: Player;
  // optional
  public names?: Array<string>; // used for Aftermath/other split cards
  public keywords?: Array<string>;
  public modifiers?: Array<Modifier>;
  public colors?: Array<string>;
  public text?: string;
  public subtypes?: Array<string>;
  public subtype?: string;
  public target?: Target;
  public zone?: Zone;
  public toCard?: Card;

  public constructor(card: Card) {
    this.uuid = uuidv4();
    this.name = card.name;
    this.types = card.types;
    this.type = _.concat(this.types, ' ');
    this.cmc = card.cmc;
    this.text = card.text;
    // todo: add logic for owner and controller
    this.subtypes = card.subtypes || [];
    this.subtype = _.concat(this.subtypes, ' ') || null;
    this.colors = card.colors || [];
    this.modifiers = [];
    this.keywords = card.keywords || [];
    this.zone = card.zone || new Zone('stack');
    this.toCard = card;
  }

  // todo: add 'CreatureSpell', 'ArtifactSpell', etc. classes for all permanent types
  // as a wrapper around the original classes but extending Spell
  // and then I won't have to rewrite this "counter" function for other things that go on the stack

  public static counter(sp: Spell): void {
    sp.counter();
  }

  public resolve(): void {

  }

  public counter(override?: void): void {
    if (override) {
      // when this matters, we'll put the code to do it here
      // for example, remand, void shatter, etc - counters that don't make it go to the GY
    } else {
      this.zone.name = 'graveyard';
      TheStack.remove(this);
      this.owner.yard.push(this.toCard);
      ths.checkCondition(this.controller.opponent, 'counteredSpell');
      // relevant for stuff like baral
    }
  }

  public counterTax(tax: number, override?: void): void {
    if (override) {
      // account for this case here (i.e. Spell Shrivel)
    } else {
      const cost = new ManaCost();
      cost.genericCost = tax;
      // to consider: are there tax effects that demand colored mana?
      this.controller.tax(cost, () => {
        this.counter();
      });
    }
  }

  public addModifier(mod: Modifier): void {
    this.modifiers.push(mod);
  }

  public damage(target: Target, amount: number): void {
    if (target.reference instanceof Creature) {
      target.reference.damage += amount;
    } else if (target.reference instanceof Planeswalker) {
      target.reference.loyalty -= amount;
    } else if (target.reference instanceof Player) {
      target.reference.currentLife -= amount;
    } else {
      throw new Error('spells cannot deal damage other than to players, creatures, and Planeswalkers');
    }
    GameInstance.bf().applyStateBasedActions();
  }

}

export class NonCreatureSpell extends Spell {
  public constructor(card: Card) {
    super(card);
  }
}

export class Instant extends NonCreatureSpell {

  public constructor(card: Card) {
    super(card);
  }

  public effect(): void {
    // need to configure this for each type of spell
  }

}

export class Sorcery extends NonCreatureSpell {
  public constructor(card: Card) {
    super(card);
  }

}

