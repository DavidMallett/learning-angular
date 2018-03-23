import { GameInstance } from './game-instance.class';
import { Player } from '../player';
import { ManaCost } from './mana-cost.class';
import { BoardState } from '../models/board-state.class';
import { Card } from '../card';
import { Hand } from '../hand';
import { InfoService } from '../services/info-service';
import { Parser } from '../util/parser.util';
import { Permanent, Creature, Planeswalker, Artifact, Enchantment, Land } from './permanent.component';
import { ActivatedAbility } from '../kersplat/activated-ability.class';
import * as _ from 'lodash';
const ifs = new InfoService();
const parser = new Parser();

interface Play {
  option: string; // i.e. 'Cast Lightning Bolt' 'Activate Hermit Druid' etc
}

/***
 *
 *  idea: "Line" interface. A Line has one or more plays associated with it.
 * a line accomplishes a goal, simply by chaining plays together
 * for example, we want to kill our opponent's Birds of Paradise
 * We have Lightning Bolt, Fatal Push, and Terminate in hand, 2 lands, and no other cards in play
 * They have no mana available and cannot respond
 * We would have 3 plays: ["cast bolt", "cast push", "cast terminate"]
 * We make 3 child trees, one for each possible play.
 * Now each child tree checks the plays available to it.
 * For each play, see what happens w
 *

*/
export class DecisionTree {

  public instance: GameInstance;
  public player: Player;
  public opponent: Player;
  public state: BoardState;
  public children: Array<DecisionTree>;
  public parent: DecisionTree;

  public constructor(state: BoardState) {
    this.instance = state.game;
    this.player = state.controller;
    this.opponent = _.find(state.game.players, (pl: Player, index: number) => {
      return pl.name !== state.controller.name;
    });
    this.state = state;
    this.children = [];
  }

  // public variant()

  public spawnChildren(): void { // or spawnChild
    // todo: figure out how to do this
  }

  // todo: fix this later
  // public cardOptions(hand: Hand): Array<Play> {
  //   const arr: Array<Play> = [];
  //   _.each(hand.cardsInHand, (card: Card, index: number) => {
  //     if (ManaCost.parseManaCost(card.manaCost).canBeCastBy(ifs.manaAvailable(this.player))) {
  //       arr.push({
  //         option: 'cast ' + card.name
  //       });
  //     }
  //   });
  //   return arr;
  // }


  // fix is somewhere in the middle vvv
  // public identifyOptions(): Array<Play> {
  //   let arr = new Array<Play>();
  //   const creatures: Array<Creature> = [];
  //   arr = this.cardOptions(this.player.hand);
  //   // todo: for each ability that we can afford to activate, iterate through the abilities
  //   // and add them to the array of possible plays
  //   _.each(this.player.controls, (perm: Permanent, index2: number) => {
  //     if (perm.type === 'creature') { creatures.push(<Creature>perm); }
  //     if (perm.abilities && perm.abilities.length > 0) {
  //       // todo: fix this later
  //       // _.each(perm.abilities, (abil: ActivatedAbility, index3: number) => {
  //       //   if (abil.cost.manaCost.canBeCastBy(ifs.manaAvailable(this.player))) {
  //       //     arr.push({
  //       //       option: 'activate ' + perm.name
  //       //     });
  //       //   }
  //       // });
  //     }
  //   });
  //   if (this.instance.phase.currentPhase === 'beginningOfCombatStep') {
  //     _.each(creatures, (c: Creature, index4: number) => {
  //       arr.push({
  //         option: 'attack with ' + c.name
  //       });
  //     });
  //   }
  //   if (this.instance.phase.currentPhase === 'declareAttackersStep') {
  //     _.each(creatures, (c2: Creature, index5: number) => {
  //       arr.push({
  //         option: 'block with ' + c2.name
  //       });
  //     });
  //   }
  //   return arr;
  // }

}
