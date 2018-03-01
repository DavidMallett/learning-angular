import { Card } from '../card';
import { EtbEffect } from './etbEffect.class';
import { Trigger } from './trigger.class';
import { Interpreter } from './interpreter.class';
import { KeywordHandler } from './keywordhandler.class';
import { TheStack } from '../core/theStack';
import { Target } from '../models/target.interface';
import { Source } from '../models/source';

export class TriggerResolver {

  constructor() {

  }

  public static resolve(trigger: Trigger): void {
    switch (trigger.target.targetType) {
      case 'self':
        break;
      default:
        throw new Error('invalid target');
    }
  }
}


