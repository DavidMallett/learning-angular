import { Player } from './player';
import { CardInterface } from './models/card.interface';
import { CardInfoService } from './services/card-info.service';
import { Zone } from './models/zone.class';
import { Graveyard } from './core/graveyard.component';
// import { Modifier } from './core/modifier.class';
import * as uuid from 'uuid';
const uuidv4 = require('uuid/v4');
const mtg = require('mtgsdk');
const _ = require('lodash');
const cis: CardInfoService = new CardInfoService();

export class Card implements CardInterface {

  public name: string;
  public types: Array<string>;
  public type: string;
  public cmc: number;
  // mtgsdk
  public names?: Array<string>; // used for double-faced cards, flip cards, etc
  public manaCost?: string; // should be able to interpret both {U}{B} and 3UU
  public colors?: Array<string>;
  public colorIdentity?: Array<string>;
  public supertypes?: Array<string>;
  public subtypes?: Array<string>;
  public rarity?: string;
  public text?: string;
  public flavor?: string;
  public artist?: string;
  public number?: string;
  public power?: number; // MTGJSON defines this as a string because of Tarmogoyf
  public toughness?: number; // ^^
  public loyalty?: number;
  public multiverseId?: number; // is this a number?
  public variations?: Array<number>;
  public imageName?: string;
  public watermark?: string;
  public border?: 'black' | 'white' | 'silver';
  public timeshifted?: boolean;
  public hand?: string; // vanguard modifier
  public life?: string; // vanguard modifier
  public reserved?: boolean; // reserved list status
  public releaseDate?: string;
  public starter?: boolean;
  public mciNumber?: string;
  // not in mtgsdk
  public owner?: Player;
  public uuid?: string;
  public hasStateBasedEffect?: boolean;
  public hasEtbEffect?: boolean;
  public supertype?: string; // concat the supertypes array
  public subtype?: string; // concatenation of subtypes array
  public keywords?: Array<string>;
  public additionalCosts?: Array<string>;
  public zone?: Zone; //
  // public modifiers?: Array<Modifier>;

  public constructor(name: string) {
    this.name = name;
    this.keywords = [];
    // this.modifiers = [];
    const theCard: Card = cis.findCardByName(name);
    this.uuid = uuidv4();
    _.create(this, theCard);
  }


  //  These vvv should be methods of this class's children, i.e. CreatureCard, InstantCard, etc
  // public modify(): void {
  //   _.each(this.modifiers, (mod: Modifier, index: number) => {
  //     mod.applyToCard(this);
  //   });
  // }

  // public discard(): void {
  //   this.owner.yard.push(this);
  //   this.zone.name = 'graveyard';
  // }

  public toString(): string {
    let resultStr = '';
    resultStr += '\n::::::\n';
    return _.forIn(this, (value, key) => {
      resultStr += key + ': ' + value + '\n';
    }).then(() => {
      return resultStr;
    });
  }
}
