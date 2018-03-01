/**
 * If we have a direct reference to the object being targetted, use that;
 * Else, use UUID (or array of UUIDs for spells with multiple targets);
 * These are optional because targetType can be "self" or "all permanents" etc
 */
import { Battlefield } from '../core/battlefield.class';
import { GameInstance } from '../core/game-instance.class';

export class Target {
  targetType: string;
  targetId?: string;
  targetIds?: Array<string>;
  reference?: any;

  public constructor(type: string, ref?: any) {
    this.targetType = type;
    this.reference = ref;
    this.targetId = this.reference.id;
  }

  public changeTarget(ref?: any, id?: string): void {
    if (ref) {
      this.reference = ref;
      this.targetId = ref.uuid;
    } else if (id) {
      this.targetId = id;
      // this.reference = GameInstance.lookup(id);
    }
  }
}
