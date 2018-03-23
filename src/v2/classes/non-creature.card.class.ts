import { Card } from '../interfaces/card/card.interface';

export class NonCreatureCard implements Card {
  // required by card
  public name: string;
  public types: Array<string>;
  public type: string;
  public cmc: number;
  // required by NonCreatureCard
  public manaCost?: string; // must be optional because of cards like Ancestral Vision
  /** Other things needed by certain non creature cards:
   * loyalty (planeswalkers)
   * keywords
   * modifiers
   * colors
   * owner
   * However, none of these are required
   */
}
