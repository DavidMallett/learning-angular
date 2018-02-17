import { Permanent, Creature, Artifact, Land, Enchantment, Planeswalker } from './permanent.component';
const mtg = require('mtgsdk');

describe('a unit test for methods of the Permanent component', () => {

  it('should ensure that the toString() method works', (done) => {
    mtg.card.where({
      supertypes: 'legendary',
      subtypes: 'human',
      cmc: 2,
      set: 'Dark Ascension'
    }).then(theCard => {
      console.log('card retrieved from API: ' + theCard.toString());
      const cardToTest: Permanent = new Permanent(theCard);
      console.log(cardToTest.toString());
    });
  });
});
