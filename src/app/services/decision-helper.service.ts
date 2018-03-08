import { Injectable } from '@angular/core';
import { Permanent, Creature, Artifact, Planeswalker, Enchantment, Land } from '../core/permanent.component';
import { Source } from '../models/source';
import { Modifier } from '../core/modifier.class';
import { Spell, Instant, Sorcery } from '../core/spell.class';
import { Card } from '../card';
import { GameInstance } from '../core/game-instance.class';
import { Battlefield } from '../core/battlefield.class';
import { Player } from '../player';
import { ActivatedAbility } from '../kersplat/activated-ability.class';
import { ManaAbility } from '../kersplat/mana-ability.class';
import { InfoService } from './info-service';
import { KnownInformation } from '../models/known-info.class';
import * as _ from 'lodash';

@Injectable()
export class DecisionHelperService {

  // public known: KnownInformation;

  public aggregateThreats(opp: Player): number {
    
  }


}
