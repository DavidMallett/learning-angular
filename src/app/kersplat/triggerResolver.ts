import { Card } from '../card';
import { EtbEffect } from './etbEffect.class';
import { Trigger } from './trigger.interface';
import { Interpreter } from './interpreter.class';
import { KeywordHandler } from './keywordhandler.class';

export class TriggerResolver {
  public stack: Trigger[];
  public pendingEffect: Trigger;
  public stateBasedEffects?: string;
  public stackDepth: number;

  constructor() {
    this.stack = [];
    this.stackDepth = 0;
  }

  public push(trig: Trigger): void {
    this.stack.push(trig);
    this.stackDepth++;
  }

  public resolve(): void {
    this.pendingEffect = this.stack.pop();
    // switch(){} // check to see what the effect is

    // if(this.pendingEffect.target === null || this.pendingEffect.target === undefined) {
      // handle targets here
      // gameInstance
    }
  }

}

