import { Hand } from './hand';
import { Card } from './card';
import { Permanent, Creature, Land, Artifact, Enchantment } from './core/permanent.component';
import { Deck } from './deck.component';
import { Battlefield } from './core/battlefield.class';
import * as uuid from 'uuid';
const _ = require('lodash');

const uuidv4 = require('uuid/v4');

export class Player {
  public uuid: string;
  public hand: Hand;
  public deck: Deck;
  public controls: Permanent[];
  public owns: Permanent[];
  public controlsLegends: Permanent[];
  public bf: Battlefield;
  public hasPlayedLandThisTurn: boolean;
  public priority: boolean;
  public startingLife: number;
  public currentLife: number;
  public isActivePlayer?: boolean;
  public manaPool: Array<string>;

  public constructor(deck: Deck, bf: Battlefield) {
    this.startingLife = 20;
    this.currentLife = this.startingLife;
    this.uuid = uuidv4();
    this.bf = bf;
    this.hand = new Hand();
    this.deck = deck;
    this.controls = [];
    this.owns = [];
    this.controlsLegends = [];
    this.deck.shuffle();
    this.manaPool = [];
  }

  public drawCard(): void {
    const newCard: Card = this.deck.draw();
    newCard.uuid = uuidv4();
    this.hand.add(newCard);
  }

  public givePriority(): void {
    this.priority = true;
  }

  public passPriority(): void {
    this.priority = false;
  }

  public hasPriority(): boolean {
    return this.priority;
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
      this.bf.register(perm);
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
