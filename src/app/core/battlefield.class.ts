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
import { Condition } from '../models/condition.interface';
import { Source } from '../models/source';
import { StaticEffect } from '../kersplat/static-effect.class';
import { CombatController } from './combat/combatController';
import * as uuid from 'uuid';
const _ = require('lodash');
const ths: TriggerHelperService = new TriggerHelperService();

const thePhases = require('../phases.json');
const uuidv4 = require('uuid/v4');

export class Battlefield {
  public permanents: Array<Permanent>;
  public creatures: Creature[];
  public lands: Land[];
  public artifacts: Artifact[];
  public enchantments: Enchantment[];
  public planeswalkers: Planeswalker[];
  public fieldEffects: Array<StaticEffect>;
  public gameId: string;
  public phase: Phase;
  public logger: Logger;
  public players: Array<Player>;
  public activePlayer?: Player;
  public cc: CombatController;

  public constructor(instance: string) {
    this.logger = new Logger();
    this.permanents = [];
    this.creatures = [];
    this.lands = [];
    this.artifacts = [];
    this.enchantments = [];
    this.planeswalkers = [];
    this.fieldEffects = [];
    this.players = [];
    this.gameId = instance;
    this.phase = new Phase('firstMainPhase');
    this.cc = null;
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

  public toNextPhase(): void {
    if (this.validateEmptyStack()) {
      this.phase.advancePhase();
    } else {
      throw new Error('cannot advance to next phase because there are actions on the stack');
    }
  }

  public applyStateBasedActions(): void {

    this.applyStateBasedActionsToCreatures();
    this.applyStateBasedActionsToPlaneswalkers();
    this.applyStateBasedActionsToPlayers();
  }

  public checkStateBasedAbilities(): void {
    _.each(this.fieldEffects, (effect, index) => {
      effect.evaluateCondition();
    });
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

  public validateEmptyStack(): boolean {
    return TheStack.theStack.length === 0;
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

  public validateSorcerySpeed(perm: Permanent): boolean {
    return (perm.keywords.indexOf('flash') < 0 &&
      (this.phase.name() === 'firstMainPhase' ||
      this.phase.name() === 'postCombatMainPhase'));
  }

  public etb(perm: Permanent): void {
    if (perm.hasEtbEffect) {
      ths.stackTriggers(perm.triggers);
    } else {
      Logger.gLog(perm.name + ' entered the battlefield without triggering anything');
    }
  }

  public register(perm: Permanent): string {
    switch (perm.type) {
      case 'creature':
        this.registerCreature(Creature.convert(perm));
        return perm.uuid;
      case 'land':
        this.registerLand(Land.convert(perm));
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

  private registerFieldEffect(effect: StaticEffect): void {
    this.fieldEffects.push(effect);
  }

}

