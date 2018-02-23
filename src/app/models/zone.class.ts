import { Permanent, Creature, Land, Artifact, Enchantment } from '../core/permanent.component';
import { Card } from '../card';

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

}
