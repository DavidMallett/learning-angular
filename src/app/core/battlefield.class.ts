import { Permanent, Creature, Land, Artifact, Enchantment, Planeswalker } from './permanent.component';
import { TheStack } from './theStack';
import { GameInstance } from './game-instance.class';
import { Phase } from '../phase.class';
import { Logger } from '../util/logger.util';
import { Player } from '../player';
import { Zone } from '../models/zone.class';
import { Match } from '../models/match';
import { Trigger } from '../kersplat/trigger.class';
import { TriggerHelperService } from '../services/trigger-helper.service';
import * as uuid from 'uuid';
const _ = require('lodash');
const trig: TriggerHelperService = new TriggerHelperService();

const thePhases = require('../phases.json');
const uuidv4 = require('uuid/v4');

export class Battlefield {
  public creatures: Creature[];
  public lands: Land[];
  public artifacts: Artifact[];
  public enchantments: Enchantment[];
  public planeswalkers: Planeswalker[];
  public fieldEffects: string[];
  public gameId: string;
  public phase: string;
  public logger: Logger;
  public players: Array<Player>;
  public activePlayer?: Player;

  public constructor(instance: string) {
    this.logger = new Logger();
    this.creatures = [];
    this.lands = [];
    this.artifacts = [];
    this.enchantments = [];
    this.planeswalkers = [];
    this.fieldEffects = [];
    this.players = [];
    this.gameId = instance;
    this.phase = 'firstMainPhase';
  }

  public toString(): string {
    let resultStr = '-----\nBATTLEFIELD:\n';
    _.each(this.creatures, (c) => {
      resultStr += 'CREATURE:' + c.toString() + '\n';
    });
    _.each(this.lands, (l) => {
      resultStr += 'LAND:' + l.toString() + '\n';
    });
    _.each(this.artifacts, (a) => {
      resultStr += 'ARTIFACT:' + a.toString() + '\n';
    });
    _.each(this.enchantments, (e) => {
      resultStr += 'ENCHANTMENT:' + e.toString() + '\n';
    });
    _.each(this.planeswalkers, (p) => {
      resultStr += 'PLANESWALKER:' + p.toString() + '\n';
    });
    // do a bunch of stuff

    return resultStr;
  }

  public applyStateBasedActionsToCreatures(): void {
    _.each(this.creatures, (c: Creature) => {
      // lethal damage / zero toughness check
      if (c.damage >= c.toughness || c.toughness < 1) {
        c.die();
      }
    });
  }

  public applyStateBasedActionsToPlayers(): void {
    _.each(this.players, (p: Player) => {
      if (p.currentLife < 1) {
        p.lose();
      }
    });
  }

  public applyStateBasedActionsToPlaneswalkers(): void {
    _.each(this.planeswalkers, (p: Planeswalker) => {
      if (p.loyalty < 1) {
        p.die();
      }
    });
  }

  public remove(perm: Permanent): void {
    switch (perm.type) {
      case 'creature':
        // The arrow function can be simplified by removing the curly braces and return
        // This used to be: _.remove(this.creature, (c) => { return c.name === perm.name; });
        _.remove(this.creatures, (c: Creature) => c.uuid === perm.uuid);
        this.logger.log('removed ' + perm.name + ' from the battlefield');
        break;
      case 'land':
        _.remove(this.lands, (l: Land) => l.uuid === perm.uuid);
        this.logger.log('removed ' + perm.name + ' from the battlefield');
        break;
      case 'artifact':
        _.remove(this.artifacts, (a: Artifact) => a.uuid === perm.uuid);
        this.logger.log('removed ' + perm.name + ' from the battlefield');
        break;
      case 'enchantment':
        _.remove(this.enchantments, (e: Enchantment) => e.uuid === perm.uuid);
        this.logger.log('removed ' + perm.name + ' from the battlefield');
        break;
      case 'planeswalker':
        _.remove(this.planeswalkers, (p: Planeswalker) => p.uuid === perm.uuid);
        this.logger.log('removed ' + perm.name + ' from the battlefield');
        break;
      default:
        throw new Error('Error: ' + perm.type + ' is not a permanent type');
    }
  }

  public getCreatures(): Array<Creature> {
    return this.creatures;
  }

  public validateSorcerySpeed(perm: Permanent) {
    return (perm.keywords.indexOf('flash') < 0 &&
      (this.phase === 'firstMainPhase' ||
      this.phase === 'postCombatMainPhase'));
  }

  public register(perm: Permanent): string {
    switch (perm.type) {
      case 'creature':
        this.registerCreature(Creature.convert(perm));
        return perm.uuid;
      case 'land':
        this.registerLand(perm);
        return perm.uuid;
      case 'artifact':
        this.registerArtifact(perm);
        return perm.uuid;
      case 'enchantment':
        this.registerEnchantment(perm);
        return perm.uuid;
      case 'planeswalker':
        this.registerPlaneswalker(Planeswalker.convert(perm));
        return perm.uuid;
      default:
        throw new Error('Error: ' + perm.type + ' is not a permanent type');
    }
  }

  private registerCreature(c: Creature): void {
    this.creatures.push(c);
  }

  private registerLand(l: Land): void {
    this.lands.push(l);
  }

  private registerArtifact(a: Artifact): void {
    this.artifacts.push(a);
  }

  private registerEnchantment(e: Enchantment): void {
    this.enchantments.push(e);
  }

  private registerPlaneswalker(p: Planeswalker): void {
    this.planeswalkers.push(p);
  }

  private registerFieldEffect(effect: string): void {
    this.fieldEffects.push(effect);
  }

}

