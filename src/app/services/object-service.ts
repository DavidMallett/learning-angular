import { Injectable } from '@angular/core';
import { Permanent, Creature, Artifact, Planeswalker, Enchantment, Land } from '../core/permanent.component';
import { Source } from '../models/source';
import { Modifier } from '../core/modifier.class';
import { Spell, Instant, Sorcery } from '../core/spell.class';
import { Card } from '../card';

@Injectable()
export class ObjectService {

  constructor() {}

  public isMulticolored(obj: any): boolean {
    if (obj instanceof Permanent) {
      return this.isMulticoloredPermanent(obj);
    } else if (obj instanceof Spell) {
      return this.isMulticoloredSpell(obj);
    } else if (obj instanceof Card) {
      return this.isMulticoloredCard(obj);
    } else {
      throw new Error('failed to determine object type');
    }
  }

  private isMulticoloredPermanent(perm: Permanent): boolean {
    return perm.colors.length > 1;
  }

  private isMulticoloredSpell(sp: Spell): boolean {
    return sp.colors.length > 1;
  }

  private isMulticoloredCard(c: Card): boolean {
    return c.colors.length > 1;
  }

  public createCreatureToken(details: any): Creature {
    return Creature.createToken(details);
  }

  public applyModifier(mod: Modifier, obj: any) {
    if (obj instanceof Permanent) {
      mod.applyToPermanent(obj);
    } else if (obj instanceof Spell) {
      mod.applyToSpell(obj);
    } else {
      throw new Error('failed to apply modifier to unrecognized object type');
    }
  }
}
