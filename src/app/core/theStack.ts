import { GameInstance } from './game-instance.class';
const _ = require('lodash');

export class TheStack {

  public static theStack: Object[];

  public static push(uuid: string): void {
    TheStack.theStack.push(uuid);
  }

  public static resolve(): void {
    const thingToResolve: any = TheStack.theStack.pop();
    switch (thingToResolve.type) {
      case 'ActivatedAbility':
        AbilityResolver.resolve(thingToResolve);

    }
  }

}
