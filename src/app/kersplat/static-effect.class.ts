import { Target } from '../models/target.interface';

interface Condition {
  thingToWatch?: any;
  isTrue: boolean;
}

// could also be called StateBasedEffect
export class StaticEffect {

  public endsAt: string;
  public effect: void;
  public target: Target;
  public condition: Condition; // todo: consider writing Condition class

  constructor(eff?: void, tar?: Target, until?: string) {
    this.effect = eff || null;
    this.target = tar || null;
    this.endsAt = until || 'never';
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
