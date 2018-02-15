import { TriggerResolver } from './triggerResolver';
import { Trigger } from './trigger.interface';

export class Interpreter {

  public interpretEtbEffect(trigger: string): void {
    let resolver: TriggerResolver = new TriggerResolver();
    const trig = trigger.split(' ');
    let effects = new EtbEffect();
    for(let i=0; i<trig.length; i++) {
      switch(trig[i]) {
        case '~': 
          
      }
    }
  }


}