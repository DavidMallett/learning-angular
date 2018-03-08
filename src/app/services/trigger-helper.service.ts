import { Trigger } from '../kersplat/trigger.class';
import { Battlefield } from '../core/battlefield.class';
import { GameInstance } from '../core/game-instance.class';
import { TheStack } from '../core/theStack';
import { Injectable } from '@angular/core';
import { Condition } from '../models/condition.interface';

// import * as _ from 'lodash';
const _ = require('lodash');

@Injectable()
export class TriggerHelperService {

  public onUpkeepTriggers: Array<Trigger>;
  public onEndStepTriggers: Array<Trigger>;
  public onCombatTriggers: Array<Trigger>;
  public onAttackTriggers: Array<Trigger>;
  public onDrawTriggers: Array<Trigger>;
  public onStateChangeTriggers: Array<Trigger>;

  public constructor() {
    this.onUpkeepTriggers = [];
    this.onEndStepTriggers = [];
    this.onCombatTriggers = [];
    this.onAttackTriggers = [];
    this.onDrawTriggers = [];
    this.onStateChangeTriggers = [];
  }

  public static execute(t: Trigger): void {
    _.each(t.effect, (eff: string, index: number) => {
      // todo: logic to apply the effect
    });
  }

  public stackTriggers(triggers: Array<Trigger>) {
    _.each(triggers, (trig: Trigger, index: number) => {
      TheStack.push(triggers.pop());
    });
  }

  public checkCondition(obj: any, event: string): void {
    // see if an event occurring to an object causes an ability to trigger
    _.each(this.onStateChangeTriggers, (trigger: Trigger, index: number) => {
      if (trigger.checkEvent(event)) {
        TriggerHelperService.execute(trigger);
      }
    });
  }

  public registerTrigger(on: string, t: Trigger): void {
    switch (on) {
      case 'upkeep':
        this.onUpkeepTriggers.push(t);
        // register the trigger with the battlefield and/or gamestate
        break;
      case 'endStep':
        this.onEndStepTriggers.push(t);
        break;
      case 'combat':
        this.onCombatTriggers.push(t);
        break;
      case 'attack':
        this.onAttackTriggers.push(t);
        break;
      case 'draw':
        this.onDrawTriggers.push(t);
        break;
      case 'stateChange':
        this.onStateChangeTriggers.push(t);
        break;
      default:
        throw new Error('unrecognized target for trigger');
    }
  }

}
