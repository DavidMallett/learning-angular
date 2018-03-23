import { Permanent, Creature } from '../../app/core/permanent.component';
import { CreatureCard, NonCreatureCard } from '../../app/creature-card';
import { Card } from '../../app/card';
import { Player } from '../../app/player';
import { CardInfoService } from '../../app/services/card-info.service';
import { TriggerHelperService } from '../../app/services/trigger-helper.service';

const cis = new CardInfoService();
const ths = new TriggerHelperService();

export class SnapcasterMage extends CreatureCard {

  public constructor (name: string) {
    super(name);
    this.keywords.push('flash');
  }

}
