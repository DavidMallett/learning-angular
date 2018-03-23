import { Card } from '../interfaces/card/card.interface';
import * as _ from 'lodash';

export class CreatureCard implements Card {

  // required by Card
  public name: string;
  public types: Array<string>;
  public type: string;
  public cmc: number;
  // required by CreatureCard
  public power: number;
  public toughness: number;
  public manaCost: string; // in the format {2}{B}{B}
  public subtypes: Array<string>;
  public damage: number;

  public constructor(card: Card) {
    this.name = card.name;
    this.types = card.types;
    this.type = _.join(this.types, ' ');
    this.cmc = card.cmc;
    this.power = card.power;
    this.toughness = card.toughness;
    this.manaCost = card.manaCost;
    this.subtypes = card.subtypes;
    this.damage = 0;
  }

}

