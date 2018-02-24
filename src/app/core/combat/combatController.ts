import { Player } from '../../player';
import { Phase } from '../../phase.class';
import { Permanent, Creature, Artifact, Enchantment } from '../permanent.component';
import { Battlefield } from '../battlefield.class';
import { TheStack } from '../theStack';
import * as _ from 'lodash';

// just realized this class is redundant.
// might abandon it and restart

interface AttackingCreature {
  power: number;
  toughness: number;
  keywords: Array<string>;
  blockedBy?: Array<BlockingCreature>;
}

interface BlockingCreature {
  power: number;
  toughness: number;
  keywords: Array<string>;
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

  public constructor() {
    this.attackers = [];
    this.blockers = [];
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
        blockedBy: []
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
        this.assignBlocker(b, b.blocking)
      }
    });
  }

  private assignBlocker(blocker: BlockingCreature, attacker: AttackingCreature): void {
    attacker.blockedBy.push(blocker);
    this.blockers.push(blocker);
  }

  public assignDamage(): void {
    // for (let i = 0; i < this.attackers.length; i++) {
    //   if (this.attackers[i].blockedBy.length === 0) {
    // TODO: rewrite using _#each and then check state based effects after damage
    //   }
    // }
  }
}
