import { Permanent, Creature } from '../../app/core/permanent.component';
import { Card } from '../../app/card';
import { Player } from '../../app/player';

export class StreetWraith extends Creature {

  public constructor(card: Card) {
    super(card);
    this.keywords.push('swampwalk');
  }

  public cycle(): void {
    if (this.zone.name === 'hand') {
      // this.owner.discard()
      /**
       * So, this class presents a problem:
       * We need an intermediate 'CreatureCard' class that implements card
       * so we can cycle this as a card (and put it in the yard, etc)
       */
    }
  }

}
