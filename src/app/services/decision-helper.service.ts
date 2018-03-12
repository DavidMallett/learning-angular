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
import { ThreatLevel } from '../logic/threat-level.class';
import * as _ from 'lodash';

interface Threat {
  impact: number;
  danger: number;
  /*
    impact: the impact that the creature will have
      in terms of damage
      in terms of triggers (on damage) or keywords
      + a lot if an attack could kill a player or Planeswalker
    danger: the risk of losing the creature by attacking
      in terms of opponent's blockers and how big they are
      in terms of opponent's creatures' triggers/abilities
      + a lot if we know the player has removal/tricks or if the creature is smaller than all the blockers
    impact - danger = x
      if impact >> danger, attack (if impact - danger > a certain threshold, attack)
      if danger >> impact, don't attack
      if impact and danger are close together or equal, then it depends on what cards we have and what we know they have

    */
}


@Injectable()
export class DecisionHelperService {

  // public known: KnownInformation;

  public aggregateThreats(opp: Player): number {
    const result = new ThreatLevel(opp);
    _.each(opp.controls, (perm: Permanent, index: number) => {
      result.plus(new ThreatLevel(perm));
    });
    return result.level;
  }

  public analyzeAttacks(possibleAttackers: Array<Creature>, defendingPlayer: Player): Array<string> {
    const options: Array<string> = [];
    /*
    look at their board, their cardsInHand, and any knownInformation we have,
      and return an array of possible attacks ordered from best to worst
    for each of our creatures:
      iterate through each of their creatures
      if (theirCreature.power < ourCreature.toughness && ourCreature.power > theirCreature.toughness)
        best case; add potential attacker to array
    other cases: creatures trade, their creature kills our creature, their creature chumps our creature
    if knownInformation.opponentCards includes a known instant and/or combat trick, increase threat level
    for each of their cards in hand, threat.plus(one)
    for each of their activated abilities, if that ability can target our creatures or their creatures, threat.plus(two) per ability
    if we have instants, counters, or abilities, reduce the threat level correspondingly
    */
    // shortcuts - cases where we have obvious attacks
    const defendingCreatures: Array<Creature> = defendingPlayer.getCreatures();
    if (possibleAttackers.length === 0) {
      return options; // no attacks available
    } else if (defendingCreatures.length === 0) {
      options.push('attack with everything');
    // if we think of other conditions to check before we iterate through everything, put them here
    } else {
      _.each(possibleAttackers, (ac: Creature, index: number) => {
        let impact = 0;
        let danger = 0;
        impact += ac.power;
        _.each(defendingCreatures, (dc: Creature, index2: number) => {
          // for now, make this basic and then later the computer can learn what keywords to watch out for
          // todo: add shortcuts for cases where it's obvious what we should do
          if (ac.power >= dc.toughness) {
            // case: we can kill them
            impact++;
            if (ac.toughness > dc.power) {
              // case: we kill them, they don't kill us
              impact++;
            } else if (ac.toughness <= dc.power) {
              // case: we kill them, they kill us
              danger++;
              if (dc.keywords.indexOf('first strike') > -1) {
                impact = 0;
                danger += 5;
              }
            }
          } else if (ac.power < dc.toughness) {
            // case: we can't kill them
            impact--;
            if (dc.power >= ac.toughness) {
              // case: we don't kill them but they kill us
              danger++;
            }
          }

        });
      });
    }
  }


}
