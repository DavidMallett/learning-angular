import { Permanent, Creature } from '../permanent.component';
import { Battlefield } from '../battlefield.class';

export class Trigger {
  public origin: string; // UUID of permanent or card that caused this effect
  public target: Array<string>; // can have multiple targets, or use keywords for stuff like 'all creatures', etc
  public effect: Function;

  public constructor(origin: string, target: Array<string>, effect: Function) {
    this.origin = origin;
    this.target = target;
    this.effect = effect;
  }

  public static prowessTrigger(c: Creature): Trigger {
    return new Trigger(c.uuid, ['self'], () => {
      
    })
  }

}
