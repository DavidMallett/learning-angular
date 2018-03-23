import { Permanent, Creature } from '../../app/core/permanent.component';
import { CreatureCard, NonCreatureCard } from '../../app/creature-card';
import { Card } from '../../app/card';
import { CardInfoService } from '../../app/services/card-info.service';
// import { Trigger } from '../../app/kersplat/trigger.class';
// import { Target } from '../../app/models/target.interface';
// import { TheStack } from '../../app/core/theStack';
import { Modifier } from '../../app/core/modifier.class';

const cis = new CardInfoService();
// const ths = new TriggerHelperService();

export class SnapcasterMage extends Creature {

  public constructor (card: Card) {
    super(card);
  }

  // todo: redo this whole implementation to use the stack
  public etbTrigger(target: NonCreatureCard): Modifier {
  // put this on the stack().then => {
    // validate that the card is an instant/sorc in its owner's graveyard
    // then give it flashback
  // }
    // return new Trigger('snapcasterFlashback');

    // just apply a modifier to target spell giving it the "flashback" keyword
    // validate
    if (target.zone.name !== 'graveyard' ||
      !this.controller.yard.contains(target) ||
      (target.type !== 'instant' && target.type !== 'sorcery')
    ) {
      throw new Error('target must be an instant or sorcery in your graveyard');
    } else {
      const modifier = new Modifier(() => {
        modifier.addKeyword('flashback');
        modifier.duration = 'eot';
        modifier.applyToCard(target);
        // target.modify();
      });
      return modifier;
    }
  }

}
