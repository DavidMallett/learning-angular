import { Player } from '../player';
import { Battlefield } from './battlefield.class';
import { Permanent, Creature } from './permanent.component';
import { Turn } from '../turn.class';
import { StaticEffect } from '../kersplat/static-effect.class';
import { Logger } from '../util/logger.util';
import { Zone } from '../models/zone.class';
import { Match } from '../models/match';
import { Phase } from '../phase.class';
import { Card } from '../card';
import { Modifier } from './modifier.class';
import { TriggerHelperService } from '../services/trigger-helper.service';
import * as uuid from 'uuid';
const _ = require('lodash');
const fs = require('fs');
const ths = new TriggerHelperService();
const uuidv4 = require('uuid/v4');

export class GameInstance {
  public static currentGameInstance: GameInstance;
  public static currentBattlefield: Battlefield;
  public ths: TriggerHelperService;
  public gameNumber: number;
  public id: string;
  public players: Array<Player>;
  public format: string;
  public effects: Array<Modifier>;
  public objects: Array<Permanent>;
  public cardsInExile: Array<Card>;
  public battlefield: Battlefield;
  public activePlayer: Player;
  public zones: Array<Zone>;
  public match: Match;
  public phase: Phase;
  public turn: Turn;
  public turns: Array<Turn>;

  constructor(format: string, players: Player[]) {
    // this.ths = new TriggerHelperService();
    // ^^ todo before deletion: find out if it's better to instantiate this for each instance of a class, or globally
    this.format = format;
    this.id = uuidv4();
    this.objects = [];
    this.players = players;
    this.match = Match.current();
    this.phase = new Phase('firstMainPhase');
    this.battlefield = new Battlefield(this.id);
    this.turn = new Turn(players[0], players[1]);
    this.turns.push(this.turn);
    this.cardsInExile = [];
    GameInstance.currentBattlefield = this.battlefield;
    fs.appendFile('currentGameInstance.txt', this.toString(), (err) => {
      if (err) { throw err; }
    });
  }

  public static game(): GameInstance {
    return GameInstance.currentGameInstance;
  }

  public static bf(): Battlefield {
    return GameInstance.currentBattlefield;
  }

  public static activePlayer(): Player {
    _.each(GameInstance.currentGameInstance.players, (player: Player, index: number) => {
      if (player.isActivePlayer) {
        return player;
      }
    });
    throw new Error('active player not found or active player logic broken');
  }

  // since "exile" means "remove from the game" this is a method of the gameInstance
  public exile(perm: any): void {
    // todo: should be able to exile anything, not just permanents
    if (perm instanceof Permanent) {
      this.cardsInExile.push(
        _.remove(this.objects, (obj: Permanent, i: number) => {
          return obj.uuid === perm.uuid;
        }));

      this.battlefield.remove(perm);

      ths.checkCondition(perm, 'leftBattlefield');
    }
    if (perm instanceof Card) {
      // whatever is exiling the card should pull card from its current zone
      this.cardsInExile.push(perm);
    }
    perm.zone.name = 'exile';

  }

  public end(): string {
    // todo: logic to determine a winner if the game ends due to an unresolvable stack or board state
    // todo: actually end the game / prevent it from going on
    return _.join(['GAME OVER\n\n', this.toString()], '\n');
  }

  public passTurn(playerPassing: Player, playerStartingTurn: Player): void {
    this.turn.end();

  }

  public applyCleanupStep(): void {
    _.each(this.effects, (effect: StaticEffect) => {
      if (effect.endsAt === 'eot' || effect.endsAt === 'endOfTurn' || effect.endsAt === 'cleanupStep') {
        _.pull(this.effects, effect);
      }
    });
    _.each(this.objects, (obj: Permanent, index: number) => {
      if (obj.type === 'creature') {
        obj.damage = 0;
      }
      if (obj.modifiers.length > 0) {
        _.each(obj.modifiers, (mod: Modifier) => {
          if (mod.duration === 'eot') {
            mod.expire();
          }
        });
      }
    });
  }

  public toString(): string {
    return _.join([
      this.id,
      this.players,
      this.format,
      this.objects,
      this.battlefield,
      this.activePlayer.uuid
    ], '\n::::\n');
    // TODO: write toString() for Player, Battlefield, Objects, Hand / CardsinHand
  }

  public theBattlefield(): Battlefield {
    return this.battlefield;
  }

  public addObject(object: Permanent): void {
    this.objects.push(object);
  }

  public getObject(id: string): Permanent {
    for (let i = 0; i < this.objects.length; i++) {
      if (this.objects[i].uuid === id) {
        return this.objects[i];
      }
    }
  }

  public setActivePlayer(player: Player): void {
    this.activePlayer = player;
  }

  public getActivePlayer(): Player {
    return this.activePlayer;
  }

  public removeObject(id: string): void {
    _.remove(this.objects, (o) => o.uuid === id);
  }

  public allObjects(): Permanent[] {
    return this.objects;
  }

  // public removeObject(objectId: string): void {
  //   const index = this.objects.indexOf(objectId);
  //   if (index > -1) {
  //     this.objects.splice(index, 1);
  //   }
  // }

  public lookup(id: string) {
    // todo: write game instance to disk, then see if we can reload it
  }

  public applyStateBasedActions(): void { // consider returning a Promise to make this thenable
    for (let i = 0; i < this.objects.length; i++) {
      // check for lethal damage on creatures or toughness below 1
      if (this.objects[i].type === 'creature') {
        if (this.objects[i].damage > this.objects[i].toughness || this.objects[i].toughness < 1) {
          this.objects[i].die();
          _.pull(this.objects, this.objects[i]);
        }
      }
      // check for Planeswalkers with no loyalty counters
      if (this.objects[i].type === 'planeswalker') {
        if (this.objects[i].loyalty < 1) {
          this.objects[i].die();
          _.pull(this.objects, this.objects[i]);
        }
      }
    }
    // check for legend rule
    _.each(this.players, (player) => {
      player.applyLegendRule();
    });

    _.each(this.effects, (effect) => {
      effect.checkExpiration();
    });
  }

  // public applyDamageToObject(objectId: string, amount: number): void {

  // }

  public toDetailedString(): string {
    const currentPlayers = this.players.toString();
    const field = this.battlefield.permanents.toString();
    return _.concat(currentPlayers, field, '\n\n\n\n');
  }

}

/*
*
*
*
*
*
*
*
*
*/
