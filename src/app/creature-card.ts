import { Player } from './player';
import { CardInterface } from './models/card.interface';
import { CardInfoService } from './services/card-info.service';
// import { Zone } from './models/zone.class';
import { Permanent, Creature, Artifact } from './core/permanent.component';
// import { Graveyard } from './core/graveyard.component';
// import { Modifier } from './core/modifier.class';
import { Card } from './card';
import * as uuid from 'uuid';
import * as _ from 'lodash';

export class CreatureCard extends Card {

  public constructor(name: string) {
    super(name);
  }

  public toCreature(): Creature {
    return new Creature(this);
  }

  // public modify(): void {
  //   _.each(this.modifiers, (mod: Modifier, index: number) => {
  //     mod.applyToCard(this);
  //   });
  // }

  public discard(): void {
    this.owner.yard.push(this);
    this.zone.name = 'graveyard';
  }

}

export class NonCreatureCard extends Card {
  public constructor(name: string) {
    super(name);
  }

  // public modify(): void {
  //   _.each(this.modifiers, (mod: Modifier, index: number) => {
  //     mod.applyToCard(this);
  //   });
  // }

  public discard(): void {
    this.owner.yard.push(this);
    this.zone.name = 'graveyard';
  }
}

// export class InstantCard extends Card {
//   public constructor(name: string) {
//     super(name);
//   }
// }

// export class ArtifactCard extends Card {
//   public constructor(name: string) {
//     super(name);
//   }
// }

// export class PlaneswalkerCard extends Card {
//   public constructor(name: string) {
//     super(name);
//   }
// }

// export class SorceryCard extends Card {
//   public constructor(name: string) {
//     super(name);
//   }
// }
