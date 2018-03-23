// import { TriggerHelperService } from '../services/trigger-helper.service';
// import { Trigger } from '../kersplat/trigger.class';

export class Condition {
  public objToWatch: any;
  public event?: string;
  public method?: string;
  public satisfied?: boolean;

  constructor(obj: any, event?: string, method?: string) {
    this.objToWatch = obj; // can be a Permanent, Player, Spell, etc - any game object
    this.event = event || 'etb'; // something happens to the object (died, left battlefield, took damage, etc)
    this.method = method || null; // a certain method of the object is invoked (on)
    this.satisfied = false;
  }

  public satisfy(): void {
    this.satisfied = true;
  }

  public evaluate(): void {
    // todo: write switch statement to interpret 'event'
  }


  // check whether the given event satisfies the condition of the trigger
  public checkEvent(event: string): boolean {
    // given an event, check if that event satisfies the condition
    return event === this.event;
  }

}
