import { Permanent, Creature } from '../../app/core/permanent.component';
import { Card } from '../../app/card';
import { Player } from '../../app/player';
import { Battlefield } from '../../app/core/battlefield.class';
import { GameInstance } from '../../app/core/game-instance.class';
import { StaticEffect } from '../../app/kersplat/static-effect.class';
import { Cost } from '../../app/kersplat/cost.class';
import { CardInfoService } from '../../app/services/card-info.service';

const cis = new CardInfoService();

export class TasigurTheGoldenFang extends Creature {


  public constructor (card: Card) {
    super(card);
    this.keywords.push('delve');
  }

  public activate(): Card {
    // cost is {2}{U/G}{U/G}
    const theCost: Cost = new Cost('mana:2{U/G}{U/G}');
    this.controller.payCost(theCost);
    this.controller.deck.mill(2);
    // how to prompt the other player to pick a card?
    // add a 'choose' method to the player Class and an optional 'opponent' reference to their opponent

    
  }

}
