import { Player } from '../../player';
import { Phase } from '../../phase.class';
import { Permanent, Creature, Artifact, Enchantment, Planeswalker } from '../permanent.component';
import { Battlefield } from '../battlefield.class';
import { TheStack } from '../theStack';
// import * as _ from 'lodash';
const _ = require('lodash');

// just realized this class is redundant.
// might abandon it and restart

interface AttackingCreature {
  power: number;
  toughness: number;
  keywords: Array<string>;
  damage?: number;
  blockedBy?: Array<BlockingCreature>;
}

interface BlockingCreature {
  power: number;
  toughness: number;
  keywords: Array<string>;
  damage?: number;
  blocking?: AttackingCreature;
  blockingMultiple?: Array<AttackingCreature>;
}

interface CombatPhase {
  attackers: Array<AttackingCreature>;
  blockers: Array<BlockingCreature>;
}

export class CombatController {

  public attackers: Array<AttackingCreature>;
  public blockers: Array<BlockingCreature>;
  public attackingPlayer: Player;
  public defendingPlayer: Player;

  public constructor(ap: Player, nap: Player) {
    this.attackers = [];
    this.blockers = [];
    this.attackingPlayer = ap;
    this.defendingPlayer = nap;
  }

  public setAttackingPlayer(p: Player): void {
    this.attackingPlayer = p;
  }

  public setDefendingPlayer(p: Player): void {
    this.defendingPlayer = p;
  }

  public declareAttackers(attackers: Array<Creature>): void {
    // const theAttackers = new Array<AttackingCreature>();
    // todo: replace vvv with _.each()
    for (let i = 0; i < attackers.length; i++) {
      const newAttacker: AttackingCreature = {
        power: attackers[i].power,
        toughness: attackers[i].toughness,
        keywords: attackers[i].keywords,
        blockedBy: [],
        damage: attackers[i].damage
      };

      this.attackers.push(newAttacker);
      // if (i === attackers.length - 1) {
      //   return theAttackers;
      // }
    }
  }

  public declareBlockers(blockers: Array<BlockingCreature>): void {
    _.each(blockers, (b: BlockingCreature) => {
      if (b.blocking || b.blockingMultiple) {
        this.assignBlocker(b, b.blocking);
      }
    });
  }

  private assignBlocker(blocker: BlockingCreature, attacker: AttackingCreature): void {
    attacker.blockedBy.push(blocker);
    this.blockers.push(blocker);
  }

  public assignDamage(creature: AttackingCreature, player: Player, walker?: Planeswalker): void {
    const blocker: BlockingCreature = creature.blockedBy.pop();
    if (blocker !== null) {
      this.assignDamageToCreature(creature, blocker, player);
    }
    if (walker && player === null) {
      walker.loyalty -= creature.power;
    } else {
      // todo: determine whether to apply modifiers here or elsewhere
      player.currentLife -= creature.power;
    }
    // for (let i = 0; i < this.attackers.length; i++) {
    //   if (this.attackers[i].blockedBy.length === 0) {
    // TODO: rewrite using _#each and then check state based effects after damage
    //   }
    // }
  }

  public assignDamageToCreature(a: AttackingCreature, b: BlockingCreature, defendingPlayer: Player) {
    b.damage += a.power; // todo: cases like deathtouch + trample, etc
    if (b.damage > b.toughness && a.keywords.indexOf('trample') > 0) {
      const diff: number = b.damage - b.toughness;
      b.damage = b.toughness;
      a.power -= b.toughness;
      this.assignDamage(a, defendingPlayer);
    }
  }
}
