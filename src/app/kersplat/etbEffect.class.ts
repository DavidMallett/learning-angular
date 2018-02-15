import { Card } from '../card';
import { Trigger } from './trigger.interface';
import { GameInstance } from '../core/game-instance.class';

export class EtbEffect implements Trigger {
  public gameInstance: string;
  public actions: string[];
  public originator: string; // UUID of in-game object
  public target: string; // UUID of player or in-game object; e.g. 'eachOpponent', '{object: qrvx7}', 'anyNumberofCreatures'
  public effect: string; // e.g. '2dmg', '+1/+1'
  public isStateBasedEffect: boolean; // true if the effect from the trigger persist through phase/state changes

  constructor() {}

  public append(action: string): void {
    this.actions.push(action);
  }

  public resolve(): void {
    const game = GameInstance.prototype.getGameInstance();
    const obj = {
      'originator': this.originator,
      'action': {
        'target': this.target,
        'effect': this.effect
      },
    };
    game.applyEffect(obj);
  }

}
