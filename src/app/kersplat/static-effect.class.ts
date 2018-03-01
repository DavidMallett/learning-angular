import { Target } from '../models/target.interface';

interface Condition {
  thingToWatch?: any;
  isTrue: boolean;
}

// could also be called StateBasedEffect
export class StaticEffect {

  public endsAt: string;
  public effect: string;
  public target: Target;
  public condition: Condition; // todo: consider writing Condition class

  constructor(eff: string, tar: Target, until: string) {
    this.effect = eff;
    this.target = tar;
    this.endsAt = until;
  }

  public evaluateCondition(): void {
    if (!this.condition.isTrue) {
      this.expire();
    }
  }

  public expire(): void {
    // todo: write method to remove this from whatever Arrays it's in
  }

}
