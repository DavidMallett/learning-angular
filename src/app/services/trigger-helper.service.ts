import { Trigger } from '../kersplat/trigger.class';
import { Battlefield } from '../core/battlefield.class';
import { GameInstance } from '../core/game-instance.class';
import * as _ from 'lodash';

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

}
