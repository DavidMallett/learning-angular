import { Permanent, Creature } from '../../app/core/permanent.component';
import { Card } from '../../app/card';
import { CreatureCard } from '../../app/creature-card';
import { Player } from '../../app/player';
import { Cost } from '../../app/kersplat/cost.class';
import { ManaCost } from '../../app/core/mana-cost.class';
import { DeathShadow } from './death.shadow';
// import { Battlefield } from '../../app/core/battlefield.class';
// import { GameInstance } from '../../app/core/game-instance.class';
// import { StaticEffect } from '../../app/kersplat/static-effect.class';
const name = 'Death\'s Shadow';

export class DeathShadowCard extends CreatureCard {


  public constructor (theName: string) {
    super(theName);
  }

  public cast(manaCost: ManaCost): Creature {
    this.owner.payCost(new Cost('mana:{B}'));
    const creature: Creature = this.toCreature();
    // GameInstance.bf().register(creature);
    this.owner.controls.push(creature);
    return creature;
  }
}
