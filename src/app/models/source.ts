import { Permanent, Creature, Artifact, Enchantment, Planeswalker, Land } from '../core/permanent.component';
import { Card } from '../card';

export class Source {

  public type: string;
  public id?: string;
  public reference?: any;

  public constructor(t: string, ref?: any) {
    this.type = t;
    this.reference = ref;
    this.id = ref.id;
  }

  public card(): Card {
    if (this.reference instanceof Permanent) {
      return this.reference.card();
    }
  }

}
