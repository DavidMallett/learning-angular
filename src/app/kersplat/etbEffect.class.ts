import { Card } from '../card';
import { Trigger } from './trigger.class';
import { GameInstance } from '../core/game-instance.class';
import { Target } from '../models/target.interface';
import { Source } from '../models/source';

export class EtbEffect extends Trigger {
  public gameInstance: GameInstance;
  public actions: Array<string>;
  public source: any; // reference to source of trigger
  public target: Target; // UUID of player or in-game object; e.g. 'eachOpponent', '{object: qrvx7}', 'anyNumberofCreatures'
  public effect: Array<string>; // e.g. '2dmg', '+1/+1'
  public isStateBasedEffect: boolean; // true if the effect from the trigger persist through phase/state changes

  constructor(id: string) {
    super(id);
  }

  public append(action: string): void {
    this.actions.push(action);
  }

  // TODO: probably rewrite

  public resolve(): void {
    // const game = GameInstance.prototype.getGameInstance();
    const obj = {
      'source': this.source,
      'action': {
        'target': this.target,
        'effect': this.effect
      },
    };
    // game.applyEffect(obj);
  }

}
