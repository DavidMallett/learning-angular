import { Modifier } from '../core/modifier.class';
import { TheStack } from '../core/theStack';
import { Logger } from '../util/logger.util';
import { TriggerHelperService } from '../services/trigger-helper.service';
import { Target } from '../models/target.interface';
import { Source } from '../models/source';

export class Trigger {

  public id: string;
  public conditions?: Array<string>;
  public actions?: string[];
  public source?: Source;
  public target?: Target;
  public effect?: Array<string>;

  public constructor(identifier: string) {
    this.id = identifier;
  }

  // nb: use instanceof to identify type of object on the stack;
  // there is no need to give each object an "oType" property
  // update: added Logger#getObjectType in ./util/
  public static trigger(source: Source, name: string, mod: Modifier): void {
    const newTrigger: Trigger = new Trigger(name);
    newTrigger.source = source;
    newTrigger.setProps(mod);
    TheStack.push(newTrigger);
    Logger.gLog('trigger ' + name + ' put on the stack');
  }

  public setProps(mod: Modifier): void {
    this.target = mod.target || new Target('self');
    this.effect = mod.effects || [];
  }

  public execute(): void {

  }
}
