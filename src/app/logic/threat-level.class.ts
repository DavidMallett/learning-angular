export class ThreatLevel {

  // a number representing the level of threat an object poses
  // evaluated based on board state, cards in hand, opponent cards in hand, known info
  // also has mechanism for increasing the threat level of objects that accrue value / get bigger
  // example: 1 point per point of power on board that your opponent has
  //      +   3 points per card in opponent's hand

  public level: number;

  // public constructor(level: number) {
  //   this.level = level;
  // }

  public constructor(object?: any) {
    this.level = 0;
    if (object.power) {
      this.level += object.power;
    }
    if (object.abilities) {
      this.level += (object.abilities.length * 3);
    }
    if (object.hand) { // case: object is a Player
      this.level += (object.hand.cardsInHand.length * 3);
    }
  }

  // if we know what a card is, then that card's threat level is based on the effect/value it provides
  // (this is used to determine whether or not to counter the spell)

  // this class doesn't deal with dictating behavior based on threat level;
  // rather, this simply defines what threat level consists of and how it's evaluated

  public add(n: number): void {
    this.level += n;
  }

  public plus(otherLevel: ThreatLevel): void {
    this.level += otherLevel.level;
  }

  public subtract(n: number): void {
    this.level -= n;
  }

  public minus(otherLevel: ThreatLevel): void {
    this.level -= otherLevel.level;
  }

}
