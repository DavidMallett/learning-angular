import { Card } from '../card';
import { CardInterface } from '../models/card.interface';
import { Player } from '../player';
import { ActivatedAbility } from '../kersplat/activated-ability.class';
import { Logger } from '../util/logger.util';
import { Modifier } from './modifier.class';
import { Trigger } from '../kersplat/trigger.class';
import { GameInstance } from './game-instance.class';
import { Battlefield } from './battlefield.class';
import { TriggerHelperService } from '../services/trigger-helper.service';
import { CardInfoService } from '../services/card-info.service';
import { InfoService } from '../services/info-service';
import { Condition } from '../models/condition.interface';
import { Zone } from '../models/zone.class';
import * as uuid from 'uuid';

const _ = require('lodash');
const uuidv4 = require('uuid/v4');
const ths = new TriggerHelperService();
const ifs = new InfoService();
const cis = new CardInfoService();

export class Permanent {
  // required
  public uuid: string;
  public type: string;
  public name: string;
  public cmc: number;
  public zone: Zone;
  public owner: Player;
  public controller: Player;
  public keywords: Array<string>;
  public tapped: boolean;
  // optional
  public types?: Array<string>;
  public superTypes?: Array<string>;
  public subtypes?: Array<string>;
  public rarity?: string;
  public text?: string;
  public power?: number;
  public toughness?: number;
  public subtype?: string;
  public supertype?: string;
  public colors?: string[];
  public hasStateBasedEffect?: boolean;
  public hasEtbEffect?: boolean;
  public isArtifactCreature?: boolean;
  public damage?: number;
  public startingLoyalty?: number; // Planeswalker only
  public loyalty?: number; // Planeswalker only
  public abilities?: Array<ActivatedAbility>;
  public modifiers?: Array<Modifier>;
  public triggers?: Array<Trigger>;

  public constructor(card: Card) {
    this.uuid = card.uuid;
    this.type = card.type;
    this.name = card.name;
    this.cmc = card.cmc;
    this.keywords = card.keywords;
    if (card.subtype) {
      this.subtype = card.subtype;
    }
    if (card.supertype) {
      this.supertype = card.supertype;
    }
    if (card.colors !== null && card.colors.length > 0) {
      this.colors = card.colors;
    }
    this.hasStateBasedEffect = (card.hasStateBasedEffect ? true : false);
    this.hasEtbEffect = (card.hasEtbEffect ? true : false);
    this.modifiers = [];
    this.zone.name = 'battlefield';
    this.tapped = false;

    // todo: add logic for owner and controller

  }

  public card(): Card {
    return cis.findCardByName(this.name);
  }

  public tap(): void {
    if (this.tapped) {
      throw new Error('permanent ' + this.name + ' is already tapped');
    } else {
      this.tapped = true;
    }
  }

  public untap(): void {
    if (this.tapped) {
      this.tapped = false;
    } else {
      // do nothing
    }
  }

  public activate(abil: ActivatedAbility): void {
    // todo: validate that the permanent has the ability they're activating
    // player still has to pay the cost
    this.controller.payCost(abil.cost, abil.source);
  }

  public die(): void {
  // to 'die' is to be put into the graveyard from the battlefield
    if (this.zone === 'battlefield') {
      this.zone = 'graveyard';
      ths.checkCondition(this, 'died');
      this.owner.yard.push(this.card());

    } else {
      throw new Error('permanent not on the battlefield cannot die');
    }
  }

  public exile(): void {
    this.zone = 'exile';
    GameInstance.bf().remove(this);
    GameInstance.game().exile(this);
    ths.checkCondition(this, 'leftBattlefield');
  }

  public addModifier(mod: Modifier): void {
    this.modifiers.push(mod);
  }

  // maybe add "text" as an argument here
  public gains(keyword?: string, ability?: ActivatedAbility): void {
    if (keyword) {
      this.keywords.push(keyword);
    }
    if (ability) {
      this.abilities.push(ability);
    }
  }

  public has(keyword: string): boolean {
    return (this.keywords.indexOf(keyword) > 0);
  }

  public toString(): string {
    let resultStr = '\n::::\nPERMANENT:\n';
    return _.chain(_.each(this, (key: string) => {
      if (resultStr === '') { resultStr += '\n::::\nPERMANENT:\n'; }
      resultStr += key + ': ' + this[key].toString();
    })).value();
  }

}

export class Creature extends Permanent {
  public power: number;
  public toughness: number;
  public isArtifactCreature: boolean;
  public subtype: string;
  public damage: number;
  public threatModifier?: number;
  public threatFactor?: number;

  public constructor(card: Card) {
    super(card);
    this.power = card.power;
    this.toughness = card.toughness;
    this.subtype = card.subtype;
    this.damage = 0;
    this.threatModifier = 0;
    this.threatFactor = 1;
  }

  public static convert(perm: Permanent): Creature {
    const theCreatureCard: Card = {
      'types': perm.types,
      'type': _.concat(perm.types, ' '),
      'name': perm.name,
      'cmc': perm.cmc,
      'owner': perm.owner,
      'power': perm.power,
      'toughness': perm.toughness,
      'subtype': perm.subtype
    };
    return new Creature(theCreatureCard);
  }

  // intended for use with tokens, for instance
  public static createToken(details: any): Creature {
    const theToken: Card = {
      'name': details.name,
      'types': details.types,
      'type': _.concat(details.types, ' '),
      'supertype': 'token',
      'cmc': details.cmc || 0,
      'owner': details.owner,
      'power': details.power,
      'toughness': details.toughness,
      'subtype': details.subtype
    };
    return new Creature(theToken);
  }

  public threatLevel(): number {
    let result = 0;
    result += this.power;
    result += this.keywords.length;
    this.hasStateBasedEffect ? result += 5 : result += 0;
    result += (this.abilities.length * 2);
    result += this.threatModifier;
    return result;
  }

  public incrementThreat(by: number): void {
    this.threatModifier += by;
  }

  public multiplyThreat(by: number): void {
    this.threatFactor *= by;
  }

}

export class Land extends Permanent {

  public produces?: string;
  public producesAmount?: number;

  public constructor(card: Card) {
    super(card);
  }

  public static convert(perm: Permanent): Land {
    const theLandCard: Card = {
      'types': perm.types,
      'type': _.concar(perm.types, ' '),
      'name': perm.name,
      'cmc': perm.cmc,
      'owner': perm.owner,
      'subtype': perm.subtype,
      'supertypes': perm.superTypes || null
    };
    return new Land(theLandCard);
  }

  public makeMana(symbol: string): string {
    this.tap();
    if (this.produces.indexOf(symbol) > 0) {
      let result = '';
      for (let i = 0; i < this.producesAmount; i++) {
        result += symbol;
      }
      return result;
    } else {
      throw new Error('land ' + this.name + ' does not produce ' + symbol);
    }
  }

}

export class Artifact extends Permanent {

  public constructor(card: Card) {
    super(card);
  }
}

export class Enchantment extends Permanent {

  public constructor(card: Card) {
    super(card);
  }

  // public attach(target: Permanent): void {
  //   // check that subtype === aura
  //   if (this.subtype === 'aura') {

  //   } else {
  //     throw new Error('cannot attach non-aura enchantment');
  //   }
  // }
}

export class Planeswalker extends Permanent {
  public startingLoyalty: number;
  public loyalty: number;
  public abilities: Array<ActivatedAbility>;

  public constructor(card: Card) {
    super(card);
  }

  public static convert(perm: Permanent): Planeswalker {
    const thePwCard = {
      'types': perm.types,
      'type': _.concat(perm.types, ' '),
      'name': perm.name,
      'cmc': perm.cmc,
      'owner': perm.owner,
      'startingLoyalty': perm.startingLoyalty,
      'loyalty': perm.startingLoyalty,
      'subtype': perm.subtype
    };
    return new Planeswalker(thePwCard);
  }
}
