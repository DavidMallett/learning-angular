import { Card } from '../card';
import { Player } from '../player';
import * as uuid from 'uuid';

const uuidv4 = require('uuid/v4');

export class Permanent {
  // required
  public uuid: string;
  public type: string;
  public name: string;
  public convertedManaCost: number;
  public zone: string;
  public owner: Player;
  public controller: Player;
  public keywords: Array<string>;
  // optional
  public power?: number;
  public toughness?: number;
  public subtype?: string;
  public supertype?: string;
  public colors?: string[];
  public hasStateBasedEffect?: boolean;
  public hasEtbEffect?: boolean;
  public isArtifactCreature?: boolean;
  public damage?: number;

  public constructor(card: Card) {
    this.uuid = uuidv4();
    this.type = card.type;
    this.name = card.name;
    this.convertedManaCost = card.convertedManaCost;
    this.keywords = card.keywords;
    if (card.subtype !== null) {
      this.subtype = card.subtype;
    }
    if (card.supertype !== null) {
      this.supertype = card.supertype;
    }
    if (card.colors !== null && card.colors.length > 0) {
      this.colors = card.colors;
    }
    this.hasStateBasedEffect = (card.hasStateBasedEffect ? true : false);
    this.hasEtbEffect = (card.hasEtbEffect ? true : false);
    this.zone = 'battlefield';
  }
  public die(): void {
  // to 'die' is to be put into the graveyard from the battlefield
    if (this.zone === 'battlefield') {
      this.zone = 'graveyard';
    } else {
      throw new Error('permanent not on the battlefield cannot die');
    }
  }

  public exile(): void {
    this.zone = 'exile';
  }

  public gains(keyword: string): void {
    this.keywords.push(keyword);
  }

}

export class Creature extends Permanent {
  public power: number;
  public toughness: number;
  public isArtifactCreature: boolean;
  public subtype: string;
  public damage: number;

  public constructor(card: Card) {
    super(card);
    this.power = card.power;
    this.toughness = card.toughness;
    this.subtype = card.subtype;
    this.damage = 0;
  }

  public static convert(perm: Permanent): Creature {
    const theCreatureCard: Card = {
      'type': 'creature',
      'name': perm.name,
      'convertedManaCost': perm.convertedManaCost,
      'owner': perm.owner,
      'controller': perm.controller,
      'zone': perm.zone,
      'power': perm.power,
      'toughness': perm.toughness,
      'isArtifactCreature': perm.isArtifactCreature,
      'subtype': perm.subtype
    };
    return new Creature(theCreatureCard);
  }

}

export class Land extends Permanent {

  public constructor(card: Card) {
    super(card);
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
}

export class Planeswalker extends Permanent {
  public startingLoyalty: number;
  public loyalty: number;
  public abilities: Array<ActivatedAbility>;

  public constructor(card: Card) {
    super(card);
  }
}
