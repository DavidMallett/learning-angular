import { Hand } from './hand';
import { Card } from './card';
import { Permanent, Creature, Land, Artifact, Enchantment } from './core/permanent.component';
import { Deck } from './deck.component';
import { Battlefield } from './core/battlefield.class';
import { Graveyard } from './core/graveyard.component';
import { Logger } from './util/logger.util';
import { Priority } from './core/priority.class';
import { GameInstance } from './core/game-instance.class';
import { Match } from './models/match';
import { TheStack } from './core/theStack';
import { Turn } from './turn.class';
import { Cost } from './kersplat/cost.class';
import { Parser } from './util/parser.util';

import * as uuid from 'uuid';
const _ = require('lodash');
const parser = new Parser();

const uuidv4 = require('uuid/v4');

export class Player {
  public name: string;
  public uuid: string;
  public hand: Hand;
  public deck: Deck;
  public opponent: Player;
  // public opponents: Array<Player> // implement this when we move on to multiplayer games
  public controls: Permanent[];
  public owns: Permanent[];
  public controlsLegends: Permanent[];
  public bf: Battlefield;
  public hasPlayedLandThisTurn: boolean;
  public hasPriority: boolean;
  public priority: Priority;
  public startingLife: number;
  public currentLife: number;
  public isActivePlayer?: boolean;
  public manaPool: Array<string>;
  public yard: Graveyard;
  public gameScore?: number;
  public game?: GameInstance; // or Game
  public inMatch?: Match;

  public constructor(name: string, deck: Deck) {
    this.startingLife = 20;
    this.currentLife = this.startingLife;
    this.uuid = uuidv4();
    this.bf = GameInstance.bf(); // not sure if this is actually needed
    this.hand = new Hand();
    this.deck = deck;
    this.controls = [];
    this.owns = [];
    this.controlsLegends = [];
    this.deck.shuffle();
    this.manaPool = [];
    this.yard = new Graveyard();
    this.yard.owner = this;
    this.gameScore = 0;
    this.hasPriority = false;
    this.priority = new Priority(this, this.opponent);
    this.game = GameInstance.game();
    this.inMatch = this.game.match;
  }

  public toString(): string {
    const toReturn = '------\nPlayer:\n';
    return toReturn.concat(
      'uuid: ' + this.uuid + '\n',
      'currentLife: ' + this.currentLife.toString() + '\n',
      'manaPool: ' + this.manaPool.toString() + '\n',
      'Played land for turn: ' + this.hasPlayedLandThisTurn.toString() + '\n',
      'Cards in hand: ' + this.hand.toString() + '\n',
      'Is active player? ' + this.isActivePlayer + '\n',
      'Has priority? ' + this.hasPriority);
  }

  public drawCard(): void {
    const newCard: Card = this.deck.draw();
    // newCard.uuid = uuidv4();
    this.hand.add(newCard);
  }

  public passTurn(): void {
    this.game.passTurn(this, this.opponent);
  }


  public lose(): void {
    // todo: add logic for losing the game
  }

  public win(): void {
    // todo: add logic for winning the game
    this.gameScore++;

  }

  public landForTurn(card: Card): void {
    // card must be in hand, and must be a land
    if (card.type === 'land' && this.hand.inHand(card.name) && this.hasPlayedLandThisTurn === false) {
      this.hand.remove(card);
      const perm: Permanent = new Permanent(card);
      perm.owner = this;
      perm.controller = this;
      this.controls.push(perm);
      this.owns.push(perm);
      // this.bf.register(perm);
      this.hasPlayedLandThisTurn = true;
      if (perm.supertype !== null && perm.supertype === 'legendary') {
        this.controlsLegends.push(perm);
      }
    }
  }

  public applyLegendRule(): void {
    const names: Array<string> = [];
    _.each(this.controlsLegends, (legend) => {
      if (names.includes(legend.name)) {
        const legendDupes: Array<Permanent> = _.filter(this.controlsLegends, ['name', legend.name]);
        this.choosePermsToSacrifice(legendDupes, (legendDupes.length - 1));
      } else {
        names.push(legend.name);
      }
    });
  }

  public choosePermsToSacrifice(arr: Array<Permanent>, numThingsToSac: number): void {
    const theUniqueId: string = prompt('choose a permanent to sacrifice by UUID');
    _.each(arr, (perm) => {
      if (perm.uuid === theUniqueId) {
        perm.die();
        _.remove(this.owns, (ownedObject) => {
          return ownedObject.uuid === theUniqueId;
        });
        _.remove(this.controls, (controlledObject) => {
          return controlledObject.uuid === theUniqueId;
        });
        _.remove(this.controlsLegends, (legendObject) => {
          return legendObject.uuid === theUniqueId;
        });
      }
    });
  }

  public passPriority(): void {
    if (!this.hasPriority) {
      throw new Error('you dont have priority and therefore cannot pass it');
    } else {
      this.hasPriority = false;
      this.priority.pass();
    }
  }

  public cast(card: Card): void {
    // check for priority
    if (!this.hasPriority) {
      throw new Error('cannot cast spells if you do not have priority');
    } else {
      // check for timing restrictions based on type
      if (card.type !== 'instant' &&
        _.indexOf(card.keywords, 'flash') < 0 &&
        (this.game.phase.phaseName() !== 'firstMainPhase' ||
          this.game.phase.phaseName() !== 'postCombatMainPhase')
      ) {
        throw new Error('Cannot case sorcery-speed spells outside of the main phase');
      } else {
        // possibly more checks - add one for modifiers?
        // pay the cost and put the spell on the stack
        const theCost: Cost = {
          'manaCost': parser.parseTokenArray(parser.convertCostStringToTokenArray(card.manaCost)),
          'tap': false,
          'additionalCosts': card.additionalCosts || []
        };
        const payingCost: Cost = {
          'manaCost': _.pullAll(this.manaPool, theCost.manaCost.split(' '))
        }
      }


      TheStack.push(card);
      this.priority.pass();
      // additional logic to check for triggers, pass priority, responses, etc
    }
  }

  public payMana(mana: string): Cost {
    // logic to parse string as a manaCost

  }

  public castSpell(card: Card): void {
    // validate card is in hand
    if (!(this.hand.inHand(card.name))) {
      throw new Error('Cannot cast card not in hand');
    } else {
      switch (card.type) {
        case 'creature':
          this.castCreature(card);
          break;
        case 'artifact':
          this.castArtifact(card);
          break;
        case 'instant':
          this.castInstant(card);
          break;
        case 'sorcery':
          this.castSorcery(card);
          break;
        case 'planeswalker':
          this.castPlaneswalker(card);
          break;
        case 'enchantment':
          this.castEnchantment(card);
          break;
        default:
          throw new Error('card type not a castable spell');
      }
    }
  }

  public castCreature(card: Card): void {
    // validate timing restrictions
    if (this.bf.phase !== 'firstMainPhase' &&
      this.bf.phase !== 'postCombatMainPhase' &&
        card.keywords.indexOf('flash') < 0) {
          throw new Error('cannot cast creature spells without flash during this phase');
    } else {
      // register a new permanent with the battlefield and player
      const creature: Creature = new Creature(card);
      this.owns.push(creature);
      this.controls.push(creature);
      this.bf.register(creature);
      if (creature.supertype !== null && creature.supertype === 'legendary') {
        this.controlsLegends.push(creature);
      }
    }
  }

  public castArtifact(card: Card): void {
    if (this.bf.phase !== 'firstMainPhase' &&
      this.bf.phase !== 'postCombatMainPhase' &&
      card.keywords.indexOf('flash') < 0) {
        const artifact: Artifact = new Artifact(card);
        this.owns.push(artifact);
        this.controls.push(artifact);
        this.bf.register(artifact);
        if (artifact.supertype !== null && artifact.supertype === 'legendary') {
          this.controlsLegends.push(artifact);
        }
      }
  }

  public castInstant(card: Card): void {}

  public castSorcery(card: Card): void {}

  public castPlaneswalker(card: Card): void {}

  public castEnchantment(card: Card): void {}

}
