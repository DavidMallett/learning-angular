import { CardInfoService } from './card-info.service';
import { CardInterface } from '../models/card.interface';
import { Card } from '../card';
import { expect, should } from 'chai';

const mtg = require('mtgsdk');
const _ = require('lodash');
const fs = require('fs');
const cis = new CardInfoService();
const card1name = 'Thalia, Guardian of Thraben';
const card2name = 'Storm Fleet Sprinter';
const card3name = 'Liliana of the Veil';

describe('a spec to ensure the card info service works', () => {

  it('should look up a card and write it to the cache and index', () => {
    const thalia: Card = cis.findCardByName(card1name);
    expect(thalia.cmc === 2);
    console.log(thalia);
  });

  it('should pull a card from the cache', () => {
    const thalia: Card = cis.findCardByName(card1name);
    expect(thalia.power === 2);
  });

  it('should pull all the cards from a set and save them to the cache', () => {
    cis.populateCacheWithCards('AER');
    fs.open('../../../cache/index.txt', 'r', (err, data: string) => {
      const arr: Array<string> = data.split('\n');
      console.log(arr.toString());
    });
  });

});
