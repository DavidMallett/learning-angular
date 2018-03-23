import { Permanent, Creature } from '../../app/core/permanent.component';
import { Card } from '../../app/card';
import { Player } from '../../app/player';
import { Battlefield } from '../../app/core/battlefield.class';
import { GameInstance } from '../../app/core/game-instance.class';
import { StaticEffect } from '../../app/kersplat/static-effect.class';
import { Cost } from '../../app/kersplat/cost.class';
import { CardInfoService } from '../../app/services/card-info.service';
import { Spell, Instant, Sorcery } from '../../app/core/spell.class';
import { Target } from '../../app/models/target.interface';
import { TheStack } from '../../app/core/theStack';

export class Opt extends Instant {

  public constructor(card: Card) {
    super(card);
    this.target.targetType = 'self';
    TheStack.push(this);
  }

  public effect(): void {
    this.controller.scry(1);
    this.controller.drawCard();
  }
}
