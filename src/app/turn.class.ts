import { Player } from './player';
import { Phase } from './phase.class';

export class Turn {
  public static turnCount = 0;
  public static whoseTurnIsIt: Player;
  public static players: Array<Player>;
  public activePlayer: Player;
  public nonActivePlayer: Player;
  public currentPhase: Phase;

  constructor(ap: Player, nap: Player) {
    this.activePlayer = ap;
    this.nonActivePlayer = nap;
    this.currentPhase = new Phase('untap');
    Turn.turnCount++;
  }

  public end(): void {
    this.activePlayer.passPriority();
  }

}
