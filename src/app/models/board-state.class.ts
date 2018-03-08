import { GameInstance } from '../core/game-instance.class';
import { Player } from '../player';
import { Battlefield } from '../core/battlefield.class';
import { Permanent, Creature, Artifact, Enchantment, Planeswalker, Land } from '../core/permanent.component';
import { Graveyard } from '../core/graveyard.component';
import { Hand } from '../hand';
import { KnownInformation } from './known-info.class';

export class BoardState {

  /*
    A BoardState is like a snapshot of a game; it is the equivalent of a Save State on an emulator
    The idea is twofold:
    1. We want to be able to save the game instance in such a way that we can "reload" it later
    2. We want to be able to predict future board states and identify lines of play

    */
  public game: GameInstance;
  public bf: Battlefield;
  public controller: Player;
  public field: Array<Permanent>;
  public yard: Graveyard; // alternately, Array<Card>
  public hand: Hand;
  public knownInfo: KnownInformation;

  constructor(controller: Player, game: GameInstance) {
    this.game = game;
    this.bf = game.battlefield;
    this.controller = controller;
    this.field = controller.controls;
    this.yard = controller.yard;
    this.hand = controller.hand;
    this.knownInfo = controller.knownInfo;
  }



}
