import { Permanent, Creature, Artifact, Land, Enchantment, Planeswalker } from './permanent.component';
import { CardInfoService } from '../services/card-info.service';
import { expect, should } from 'chai';
const mtg = require('mtgsdk');

describe('a unit test for methods of the Permanent component', () => {

  it('should return hello world', () => {
    const str = 'hello world';
    expect(str).to.equal('hello world');
  });

  it('should ensure that the toString() method works', () => {
    mtg.card.where({
      supertypes: 'legendary',
      subtypes: 'human',
      cmc: 2,
      set: 'Dark Ascension'
    }).then((theCard) => {
      console.log('card retrieved from API: ' + theCard.toString());
      const cardToTest = new Permanent(theCard);
      console.log(cardToTest.toString());
      expect(cardToTest.name).to.equal('Thalia, Guardian of Thraben');
    });
  });
});
