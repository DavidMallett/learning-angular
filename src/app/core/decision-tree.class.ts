import { GameInstance } from './game-instance.class';
import { Player } from '../player';
import { BoardState } from '../models/board-state.class';

import * as _ from 'lodash';

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

}
