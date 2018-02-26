import { Card } from '../card';
import { CardInterface } from '../models/card.interface';
import { Player } from '../player';
import { ActivatedAbility } from '../kersplat/activated-ability.class';
import { Logger } from '../util/logger.util';
import { Modifier } from './modifier.class';
import * as uuid from 'uuid';
import * as _ from 'lodash';

const uuidv4 = require('uuid/v4');

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

  public constructor(card: Card) {
    this.uuid = uuidv4();
    this.name = card.name;
    this.types = card.types;
    this.type = _.concat(this.types, ' ');
    this.cmc = card.cmc;
    // todo: add logic for owner and controller
    this.subtypes = card.subtypes || [];
    this.subtype = _.concat(this.subtypes, ' ') || null;
    this.colors = card.colors || [];
    this.modifiers = [];
    this.keywords = card.keywords || [];
  }


}

export class Instant extends Spell {

  public constructor(card: Card) {
    super(card);
  }

}

export class Sorcery extends Spell {
  public constructor(card: Card) {
    super(card);
  }

}

