// Card shouldn't need to import anything!

// classes CreatureCard, NonCreatureCard, and LandCard can implement this interface
// CreatureCard and NonCreatureCard will have a spell() method that convert the card to a spell and put it on the Stack


export interface Card {
  name: string;
  types: Array<string>;
  type: string;
  cmc: number;
  // mtgsdk
  names?: Array<string>; // used for double-faced cards, flip cards, etc
  manaCost?: string; // should be able to interpret both {U}{B} and 3UU
  colors?: Array<string>;
  colorIdentity?: Array<string>;
  supertypes?: Array<string>;
  subtypes?: Array<string>;
  rarity?: string;
  text?: string;
  flavor?: string;
  artist?: string;
  number?: string;
  power?: number; // MTGJSON defines this as a string because of Tarmogoyf
  toughness?: number; // ^^
  loyalty?: number;
  multiverseId?: number; // is this a number?
  variations?: Array<number>;
  imageName?: string;
  watermark?: string;
  border?: 'black' | 'white' | 'silver';
  timeshifted?: boolean;
  hand?: string; // vanguard modifier
  life?: string; // vanguard modifier
  reserved?: boolean; // reserved list status
  releaseDate?: string;
  starter?: boolean;
  mciNumber?: string;
  // not in mtgsdk
  // owner?: Player;
  uuid?: string;
  supertype?: string; // concat the supertypes array
  subtype?: string; // concatenation of subtypes array
  additionalCosts?: Array<string>;
  // zone?: Zone; //
  // modifiers?: Array<Modifier>;
}
