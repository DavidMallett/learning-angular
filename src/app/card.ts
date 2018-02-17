import { OracleText } from './oracleText.js';
import { Player } from './player';
import { CardInterface } from './models/card.interface';
import { CardInfoService } from './services/card-info.service';
const mtg = require('mtgsdk');
const _ = require('lodash');
const cis: CardInfoService = new CardInfoService();

export class Card implements CardInterface {

  public name: string;
  public types: Array<string>;
  public type: string;
  public cmc: number;
  public keywords?: Array<string>;

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
