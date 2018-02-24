import { OracleText } from './oracleText.js';
import { Player } from './player';
import { CardInterface } from './models/card.interface';
import { CardInfoService } from './services/card-info.service';
import { Zone } from './models/zone.class';
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

  public constructor(name: string) {
    this.name = name;
    this.keywords = [];
    const theCard: Card = cis.findCardByName(name);
    _.create(this, theCard);
  }

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
