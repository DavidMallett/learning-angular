import { Permanent, Creature } from '../../app/core/permanent.component';
import { Card } from '../../app/card';
import { Player } from '../../app/player';
import { Battlefield } from '../../app/core/battlefield.class';
import { GameInstance } from '../../app/core/game-instance.class';
import { StaticEffect } from '../../app/kersplat/static-effect.class';

export class DeathShadow extends Creature {


  public constructor (card: Card) {
    super(card);
    GameInstance.bf().register(new StaticEffect(this.lifeTotal())));
  }

  public lifeTotal(): void {
    // todo: which of the below implementations is better and why?
    this.power -= this.owner.life();
    this.toughness -= this.owner.currentLife;
  }
}
