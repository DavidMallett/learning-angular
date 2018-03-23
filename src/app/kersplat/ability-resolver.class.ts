// import { Battlefield } from '../core/battlefield.class';
// import { GameInstance } from '../core/game-instance.class';
import { ActivatedAbility } from './activated-ability.class';
// import { Target } from '../models/target.interface';

const _ = require('lodash');
// const theBattlefield = GameInstance.bf();

export class AbilityResolver {

  public static resolve(abil: ActivatedAbility) {
    switch (abil.target.targetType) {
      case 'self':
        // Creature gives itself +1/+1, an ability, etc
        break;
      case 'controller':
        // Creature adds mana to controllers mana pool, gains life, etc
        break;
      case 'player':
        // effect to target player
        break;
      case 'opponent':
        // effect to target opponent
        break;
      case 'opponents':
        // effect to all opponents
        break;
      case 'battlefieldObject':
        // effect to an object on the battlefield, such as a permanent, etc
        break;
      default:
        console.log('targetType ' + abil.target.targetType + ' not accounted for');
      }
  }

}
