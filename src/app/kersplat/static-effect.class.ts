import { Target } from '../models/target.interface';

export class StaticEffect {

  public endsAt: string;
  public effect: string;
  public target: Target;

  constructor(eff: string, tar: Target, until: string) {
    this.effect = eff;
    this.target = tar;
    this.endsAt = until;
  }
}
