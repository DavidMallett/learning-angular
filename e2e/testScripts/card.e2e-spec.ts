import { Card } from '../../src/app/card';

describe('a test spec for the learning-angular project', () => {

  it('should create a new card and pull the data from the MTG SDK API', () => {

    const card: Card = new Card('Thalia, Guardian of Thraben');

    console.log(card);

    expect(card.cmc).toEqual(2);

  });
});
