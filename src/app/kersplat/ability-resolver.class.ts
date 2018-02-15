import { Battlefield } from '../core/battlefield.class';

const _ = require('lodash');

export class AbilityResolver {

  public static resolve(abil: ActivatedAbility) {
    _.each(abil.targets, (target: string) => {

    });
  }
}
