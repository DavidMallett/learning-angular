
// This class exists to apply any kind of effect to an object
// for example, "+1/+1 until end of turn"
// or, "has flying as long as it is attacking"

export class Modifier {
  public keywords?: Array<string>; // keywords to add

  public duration?: string; // condition under which the modifier expires; vvv
  // for example, 'eot', 'tillThisDies', 'forever', or a function
  // "At the beginning of your end step, if you control no artifacts, sacrifice ____"

  public hostType?: string; // Type of object being modified; i.e. 'Creature'
  public target: string; // will eventually be a target object; for now, 'self', 'all', a uuid, etc

  public constructor(type: string, target: string, duration: string) {
    this.hostType = type;
    this.duration = duration;
    this.target = target;
  }

  public expire(): void {
    // todo: logic to remove the modifier
  }

  public apply(): void {
    // todo: logic to apply the modifier to a permanent, player, or spell
  }

}
