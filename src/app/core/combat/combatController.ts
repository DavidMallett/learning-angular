import { Player } from '../../player';
import { Phase } from '../../phase.class';
import { Permanent, Creature, Artifact, Enchantment } from '../permanent.component';
import { Battlefield } from '../battlefield.class';
import { TheStack } from '../theStack';

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
    this.attackingPlayer = 
  }

  public declareAttackers(attackers: Array<Creature>): void {
    // const theAttackers = new Array<AttackingCreature>();
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

  // public declareBlockers(blockers: Array<BlockingCreature>): void {
  //   for (let i = 0; i < this.attackers.length; i++) {

  //   }
  // }

  private assignBlocker(blocker: BlockingCreature, attacker: AttackingCreature): void {
    attacker.blockedBy.push(blocker);
    blocker.blocking = attacker;
  }

  public assignDamage(): void {
    for (let i = 0; i < this.attackers.length; i++) {
      if (this.attackers[i].blockedBy.length === 0) {
        
      }
    }
  }
}
