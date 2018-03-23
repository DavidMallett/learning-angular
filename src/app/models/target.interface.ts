/**
 * If we have a direct reference to the object being targetted, use that;
 * Else, use UUID (or array of UUIDs for spells with multiple targets);
 * These are optional because targetType can be "self" or "all permanents" etc
 */

export class Target {
  targetType: string;
  targetId?: string;
  targetIds?: Array<string>;
  reference?: any; // reference to thing being targetted
  source?: any; // reference to thing doing the targetting
  sourceType?: string;

  public constructor(type?: string, ref?: any, source?: any) {
    this.targetType = type || 'self';
    this.source = source || 'stateBasedActions';
    this.reference = ref || this.source;
    this.targetId = this.reference.id;
  }

  public static target(obj: any): Target {
    return new Target(obj.type, obj);
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
