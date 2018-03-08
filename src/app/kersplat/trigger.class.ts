import { Modifier } from '../core/modifier.class';
import { TheStack } from '../core/theStack';
import { Logger } from '../util/logger.util';
import { TriggerHelperService } from '../services/trigger-helper.service';
import { Target } from '../models/target.interface';
import { Source } from '../models/source';
import { Condition } from '../models/condition.interface';
import * as _ from 'lodash';


export class Trigger {

  public id: string;
  public conditions?: Array<Condition>;
  public actions?: Array<string>;
  public source?: Source;
  public target?: Target;
  public effect?: Array<string>;

  public constructor(identifier: string) {
    this.id = identifier;
    this.conditions = [];
    this.actions = [];
    this.effect = [];
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
    // todo: make this return a reference to the new Trigger
  }

  // check all conditions of a single trigger based on an event
  public checkEvent(event: string): boolean {
    _.each(this.conditions, (cond: Condition, index: number) => {
      if (!cond.checkEvent(event)) {
        return false;
      }
    });
    return true; // answers the question "does this event cause the trigger to fire?"
  }

  public conditionsMet(): boolean {
    _.each(this.conditions, (cond: Condition, index: number) => {
      if (!cond.satisfied) {
        return false;
      }
    });

    return true;
  }

  public setProps(mod: Modifier): void {
    this.target = mod.target || new Target('self');
    this.effect = mod.effects || [];
  }

  public execute(): void {

  }
}
