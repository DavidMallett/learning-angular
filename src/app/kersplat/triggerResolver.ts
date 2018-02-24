import { Card } from '../card';
import { EtbEffect } from './etbEffect.class';
import { Trigger } from './trigger.class';
import { Interpreter } from './interpreter.class';
import { KeywordHandler } from './keywordhandler.class';
import { TheStack } from '../core/theStack';
import { Target } from '../models/target.interface';

export class TriggerResolver {

  constructor() {

  }

  public static resolve(trigger: Trigger): void {
    switch (trigger.target) { // should be target.targetType soon
      case 'self':
        break;
      default:
        throw new Error('invalid target');
    }
  }
}


