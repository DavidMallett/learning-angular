import { Player } from './player';
import { Phase } from './phase.class';
import { Priority } from './core/priority.class';
import { Logger } from './util/logger.util';

export class Turn {
  public static turnCount = 0;
  public static whoseTurnIsIt: Player;
  public static players: Array<Player>;
  public static pastTurns: Array<Turn>;
  public activePlayer: Player;
  public nonActivePlayer: Player;
  public currentPhase: Phase;

  constructor(ap: Player, nap: Player) {
    this.activePlayer = ap;
    this.nonActivePlayer = nap;
    this.currentPhase = new Phase('untap');
    Turn.turnCount++;
  }

  public static whoseTurn(): Player {
    return Turn.whoseTurnIsIt;
  }

  public end(): void {
    // todo: add additional logic
    this.activePlayer.passPriority();
    Turn.pastTurns.push(this);
    Logger.gLog(this.activePlayer.name + ' ended the turn');
  }

}
