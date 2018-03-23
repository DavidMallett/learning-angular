import { Card } from '../interfaces/card/card.interface';

export class LandCard implements Card {
  // required by card
  public name: string;
  public types: Array<string>;
  public type: string;
  public cmc: number;
  // required by LandCard
  public canProduce: Array<string>;
  // ^^ an array of each type and quantity of mana the land can create
  // for example, [ "U", "W" ] or [ "UU", "UW", "WW" ]
}
