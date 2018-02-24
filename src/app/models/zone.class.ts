import { Permanent, Creature, Land, Artifact, Enchantment } from '../core/permanent.component';
import { Card } from '../card';
import * as _ from 'lodash';

const theZones: Array<string> = ['battlefield', 'exile', 'graveyard', 'hand', 'library', 'commandZone', 'phaseOut'];

export class Zone {
  public name: string;
  public permanents?: Array<Permanent>;
  public cards?: Array<Card>;

  public constructor(name: string) {
    this.name = name;
    this.permanents = [];
    this.cards = [];
  }

  public addPerm(perm: Permanent): void {
    this.permanents.push(perm);
  }

  public addCard(card: Card): void {
    this.cards.push(card);
  }

  public pullPerm(perm: Permanent): Permanent {
    return _.pull(this.permanents, perm);
  }

  public pullCard(card: Card): Card {
    return _.pull(this.cards, card);
  }


}
