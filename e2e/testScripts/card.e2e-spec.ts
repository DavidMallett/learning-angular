import { Card } from '../../src/app/card';
import { CardInfoService } from '../../src/app/services/card-info.service';
import { Permanent, Creature, Land, Artifact, Enchantment, Planeswalker } from '../../src/app/core/permanent.component';
import { expect, should } from 'chai';
const cis: CardInfoService = new CardInfoService();

const name1 = 'Thalia, Guardian of Thraben';
const name2 = 'Rhox War Monk';
const name3 = 'Griselbrand';
const name4 = 'Flooded Strand';

describe('a test spec for the learning-angular project', () => {

  it('should create a new card and pull the data from the MTG SDK API', () => {

    const card: Card = cis.findCardByName(name1);

    console.log(card.toString());

    expect(card.cmc).to.equal(2);

  });

  it('should create a new card and cast it to a creature', () => {

    const card: Card = cis.findCardByName(name2);
    const creature: Creature = new Creature(card);
    console.log(creature.toString());
    expect(creature.power).to.equal(3);
    expect(creature.text.toLowerCase()).to.contain('lifelink');


  });
});
