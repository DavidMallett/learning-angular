import { Injectable } from '@angular/core';
import { Permanent, Creature, Artifact, Planeswalker, Enchantment, Land } from '../core/permanent.component';
import { Spell, Instant, Sorcery } from '../core/spell.class';
import { Card } from '../card';
import { Player } from '../player';
import { ActivatedAbility } from '../kersplat/activated-ability.class';
import { ManaAbility } from '../kersplat/mana-ability.class';
import { KnownInformation } from '../models/known-info.class';
import { CardInfoService } from './card-info.service';
import * as _ from 'lodash';

const cis = new CardInfoService();

// The goal here: Make sure we are able to get the information the computer needs
//    in order to make decisions
//    such as: cards in hand, mana available, board state, power on board,
//      current state of the Stack, available answers, etc

// Eventually, we want the computer to be able to make a tree of possible future board states
//    and then pick the one with the best outcome (realistically we can only look like 3-4 turns ahead)

// NOTE: vvv this interface was moved to its own Class file.
//
// interface KnownInformation {
//   opponentCards?: Array<string>;
//   // for now, we will limit this to known cards in opp's hand.
//   // in the future, we will include topCardLibrary, opponentTopCardLibrary, bottomCard, morphed/face-down cards in exile, etc
//   // also, should account for cards with the same name but different art
// }


@Injectable()
export class InfoService {
  public knownInformation: KnownInformation;

  constructor() {
    this.knownInformation = new KnownInformation();
  }

  public cardsInHand(pl: Player): number {
    return pl.hand.cardsInHand.length;
  }

  public knowsAbout(cardname: string): boolean {
    return this.knownInformation.opponentCards.indexOf(cis.findCardByName(cardname)) > -1;
  }

  public seeOpponentCard(cardname: string): void {
    this.knownInformation.push(cis.findCardByName(cardname));
  }

  public deprecateKnownCard(cardname: string): void {
    const index: number = this.knownInformation.opponentCards.indexOf(cis.findCardByName(cardname));
    if (index > -1) {
      this.knownInformation.opponentCards.splice(index, 1);
    }
  }

  // a method that looks at all the mana-producing permanents a player controls
  // and makes an array of color combinations the permanent can make (eg. ['W', 'U'])
  // and then adds that to an outer array where each inner array represents a mana source
  // in another class/service, the arrays can be analyzed to determine each combination of mana that can be created

  // todo: remove the "convertToManaAbility" method
  public manaAvailable(pl: Player): Array<Array<string>> {
    const resultOuter = Array<Array<string>>();
    _.each(pl.controls, (perm: Permanent, index: number) => {
      if (perm.abilities.length > 0) {
        _.each(perm.abilities, (abil: ActivatedAbility, index2: number) => {
          if (abil.isManaAbility) {
            resultOuter.push(ManaAbility.constructFromObject(abil).possibleManaOutput());
          }
        });
      }
    });
    return resultOuter;
  }

  public totalPowerOnBoard(pl: Player): number {
    let result = 0;
    _.each(pl.controls, (perm: Permanent, index: number) => {
      if (perm.type.toLowerCase().includes('creature')) {
        result += perm.power;
      }
    });
    return result;
  }

  // returns true if the total power of pl's creatures exceeds your life total

  // public newInformation()

  // todo:
  // method to get a player's total power on board DONE
  // method to get a player's life total DONE
  // method to review known information (revealed cards, etc) DONE
  // class that has a numerical value representing the threat presented by the enemy currently
  // -> method that calculates this value based on available information
  // class that makes a tree of possible future board states based on possible plays
  // -> method that evaluates each subtree and assigns it a value where a higher value = better outcome
  // -> method that determines which play the computer will make based on all of the above
  // -> method that looks for synergies / combos in the boardstate and known information and uses that to influence decisions
  // -> > i.e. if opp has a lot of zombies and an Undead Warchief,
  //   recognize that the Undead Warchief needs to die and prioritize removing it


}
