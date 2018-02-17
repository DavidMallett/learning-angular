import { CardInterface } from './card.interface';

export interface DeckInterface {
  library: Array<Card>;
  cardsLeft: number;
  format?: string;
  name?: string; // decks don't have to have a name
  uuid?: string;
  commander?: Card; // only for EDH decks
  commanders?: Array<Card>; // only for EDH decks with partners
  sideboard?: Array<Card>;
}
