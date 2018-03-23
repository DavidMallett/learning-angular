import { Permanent, Creature } from '../../app/core/permanent.component';
import { Card } from '../../app/card';
import { Cost } from '../../app/kersplat/cost.class';
import { CardInfoService } from '../../app/services/card-info.service';
import { Spell, Instant, Sorcery } from '../../app/core/spell.class';
import { Target } from '../../app/models/target.interface';
import { TheStack } from '../../app/core/theStack';

import * as _ from 'lodash';

export class StubbornDenial extends Instant {

  public target: Target;

  constructor(card: Card, target: Target) {
    super(card);
    this.target = target;
    TheStack.push(this);
  }

  public effect(): void {
    if (this.target.targetType === 'instant' ||
      this.target.targetType === 'sorcery' ||
      this.target.targetType === 'artifact' ||
      this.target.targetType === 'enchantment' ||
      this.target.targetType === 'planeswalker') {
        // check ferocious condition
        if (_.find(this.controller.controls, (p: Permanent, index: number) => {
          return p.type === 'creature' && p.power > 3;
        })) {
          this.target.reference.counter();
        } else {
          this.target.reference.counterTax(1);
        }
    }
  }


}
