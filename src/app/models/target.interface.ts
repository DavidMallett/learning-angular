/**
 * If we have a direct reference to the object being targetted, use that;
 * Else, use UUID (or array of UUIDs for spells with multiple targets);
 * These are optional because targetType can be "self" or "all permanents" etc
 */

export interface Target {
  targetType: string;
  targetId?: string;
  targetIds?: Array<string>;
  targetReference?: any;
}
