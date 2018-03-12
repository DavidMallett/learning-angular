import { GameInstance } from './game-instance.class';
import { Player } from '../player';
import { BoardState } from '../models/board-state.class';
import { Card } from '../card';
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

  public spawnChildren(): void { // or spawnChild
    // todo: figure out how to do this
  }

  public identifyOptions(): Array<Play> {
    const arr = new Array<Play>();
    const creatures: Array<Creature> = [];
    _.each(this.player.hand.cardsInHand, (card: Card, index: number) => {
      if (parser.parseManaCost(card.manaCost).canBeCastBy(ifs.manaAvailable(this.player)) {
        arr.push({
          option: 'cast ' + card.name
        });
      }
    });
    // todo: for each ability that we can afford to activate, iterate through the abilities
    // and add them to the array of possible plays
    _.each(this.player.controls, (perm: Permanent, index2: number) => {
      if (perm.type === 'creature') { creatures.push(<Creature>perm); }
      if (perm.abilities && perm.abilities.length > 0) {
        _.each(perm.abilities, (abil: ActivatedAbility, index3: number) => {
          if (abil.cost.manaCost.canBeCastBy(ifs.manaAvailable(this.player))) {
            arr.push({
              option: 'activate ' + perm.name
            });
          }
        });
      }
    });
    if (this.instance.phase.currentPhase === 'beginningOfCombatStep') {
      _.each(creatures, (c: Creature, index4: number) => {
        
      });
    }
    return arr;
  }

}
