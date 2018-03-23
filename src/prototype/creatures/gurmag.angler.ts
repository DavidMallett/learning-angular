import { Permanent, Creature } from '../../app/core/permanent.component';
import { Card } from '../../app/card';
import { Player } from '../../app/player';
import { Battlefield } from '../../app/core/battlefield.class';
import { GameInstance } from '../../app/core/game-instance.class';
import { StaticEffect } from '../../app/kersplat/static-effect.class';
import { Cost } from '../../app/kersplat/cost.class';
import { CardInfoService } from '../../app/services/card-info.service';

const cis = new CardInfoService();

export class GurmagAngler extends Creature {

  public constructor (card: Card) {
    super(card);
    this.keywords.push('delve');
  }

}
