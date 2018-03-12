import { Turn } from './turn.class';
const thePhases = require('./phases.json');
// untap, upkeep, drawStep, firstMainPhase, beginningOfCombat, declareAttackers
// declareBlockers, damageStep, postDamageCombatStep, postCombatMainPhase, endStep,
// cleanup
export class Phase {

  public phases: string[];
  public currentPhase: string;
  public currentTurn: Turn;

  public constructor(thePhase: string) {
    this.phases = thePhases.phases;
    this.currentPhase = thePhase;
    this.currentTurn.currentPhase = new Phase(thePhase);
  }

  public name(): string {
    return this.currentPhase;
  }

  public advancePhase(): void {
    switch (this.currentPhase) {
      case 'untap':
        this.currentPhase = 'upkeep';
        break;
      case 'upkeep':
        this.currentPhase = 'drawStep';
        break;
      case 'drawStep':
        this.currentPhase = 'firstMainPhase';
        break;
      case 'firstMainPhase':
        this.currentPhase = 'beginningOfCombatStep';
        break;
      case 'beginningOfCombatStep':
        this.currentPhase = 'declareAttackers';
        break;
      case 'declareAttackers':
        this.currentPhase = 'declareBlockers';
        break;
      case 'declareBlockers':
        this.currentPhase = 'damageStep';
        break;
      case 'damageStep':
        this.currentPhase = 'postDamageCombatStep';
        break;
      case 'postDamageCombatStep':
        this.currentPhase = 'postCombatMainPhase';
        break;
      case 'postCombatMainPhase':
        this.currentPhase = 'endStep';
        break;
      case 'endStep':
        this.currentPhase = 'cleanup';
        break;
      case 'cleanup':
        this.currentTurn.end();
        this.currentPhase = 'untap';
        const t: Turn = new Turn(this.currentTurn.nonActivePlayer, Turn.whoseTurn());
        this.currentTurn = t;
        break;
      default:
        console.log('that is not a step or phase in Magic the Gathering');
    }
  }

  public isMainPhase(): boolean {
    return this.currentPhase === 'firstMainPhase' || this.currentPhase === 'postCombatMainPhase';
    // if false, cannot use sorcery speed stuff
  }

  public isBeforeCombat(): boolean {
    switch (this.currentPhase) {
      case 'untap':
        return true;
      case 'upkeep':
        return true;
      case 'drawStep':
        return true;
      case 'firstMainPhase':
        return true;
      default:
        return false;
    }
  }

}
