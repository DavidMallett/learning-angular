import { Card } from '../card';
import { Permanent, Creature, Land, Artifact, Enchantment } from '../core/permanent.component';
import { Deck } from '../deck.component';
import { Battlefield } from '../core/battlefield.class';
import { Graveyard } from '../core/graveyard.component';
import { Player } from '../player';
import { Logger } from '../util/logger.util';

export class Priority {
  public static playerWithPriority: Player;
  public ap: Player;
  public nap: Player;

  constructor(activePlayer: Player, nonActivePlayer: Player) {
    this.ap = activePlayer;
    this.nap = nonActivePlayer;
    Priority.playerWithPriority = this.ap;
  }

  public pass(): void {
    const ap = this.ap;
    const nap = this.nap;
    this.ap = nap;
    this.nap = ap;

    Priority.playerWithPriority = nap;
  }

}

// example pseudocode:
// player.cast(spell, function(resolved, [permanent or object reference]) => {
  // if (spell.resolved) {
    // checkStateBasedActions()
  // }
// })
