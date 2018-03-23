import { Card } from '../card';
import { Logger } from '../util/logger.util';
import * as _ from 'lodash';

export class Source {

  public type: string;
  public id?: string;
  public reference?: any;

  public constructor(ref?: any) {
    ref.type ? this.type = ref.type : // if ref.type undefined, use instanceof
    // ref instanceof Permanent ? this.type = 'permanent' : // source is not a permanent
    // ref instanceof Spell ? this.type = 'spell' : // not a spell
    // ref instanceof Card ? this.type = 'card' : this.type = 'unknown';
    this.reference = ref;
    this.id = ref.id || ref.uuid;
  }

  // public card(): Card {
  //   if (this.reference instanceof Permanent) {
  //     return this.reference.card();
  //   }
  // }

  // public permanent(): Permanent {
  //   if (this.reference instanceof Permanent) {
  //     return <Permanent>this.reference;
  //   }
  // }

}
