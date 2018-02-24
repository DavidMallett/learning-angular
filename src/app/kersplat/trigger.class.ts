import { Modifier } from '../core/modifier.class';
import { TheStack } from '../core/theStack';

export class Trigger {

  public id: string;
  public actions?: string[];
  public originator?: string;
  public target?: string;
  public effect?: Array<string>;

  public constructor(identifier: string) {
    this.id = identifier;
  }

  // nb: use typeof to identify type of object on the stack;
  // there is no need to give each object an "oType" property
  public static trigger(originator: string, name: string, mod: Modifier): void {
    const newTrigger: Trigger = new Trigger(name);
    newTrigger.originator = originator;
    newTrigger.setProps(mod);
    TheStack.push(newTrigger);
  }

  public setProps(mod: Modifier): void {
    this.target = mod.target || 'self';
    this.effect = mod.effects || [];
  }
}
