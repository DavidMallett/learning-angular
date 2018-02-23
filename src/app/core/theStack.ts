import { GameInstance } from './game-instance.class';
import { AbilityResolver } from '../kersplat/ability-resolver.class';
const _ = require('lodash');

export class TheStack {

  public static theStack: Array<any>;

  // things that go on the stack: spells, abilities, triggers
  public static push(obj: any): void {
    TheStack.theStack.push(obj);
  }

  public static resolve(): void {
    const thingToResolve: any = TheStack.theStack.pop();
    switch (thingToResolve.type) {
      case 'ActivatedAbility':
        AbilityResolver.resolve(thingToResolve);
        break;
      default:
        console.log('nothing to resolve or cannot recognize type of thing you are trying to resolve');
    }
  }

}
