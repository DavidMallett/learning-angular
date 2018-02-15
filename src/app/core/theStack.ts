import { GameInstance } from './game-instance.class';
const _ = require('lodash');

export class TheStack {

  public static theStack: string[];

  public static push(uuid: string): void {
    TheStack.theStack.push(uuid);

  }

  public static contains(str: string): boolean {
    return (_.findIndex(TheStack.theStack, () => ))
    // if (TheStack.theStack.toString().includes(str)) {
    //   return true;
    // } else {
    //   return false;
    // }
  }

}
