import { Player } from '../player';

export interface CardInterface {
  /**
   * Cards must have: name, type or types, and cmc
   * Other fields are optional
   * Cards to be used to construct other types of Objects (Permanents, Creatures, etc)
   */

  // Mandatory
  name: string;
  types: Array<string>;
  type: string;
  cmc: number;
  // Optional
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
  // Not included in MTG SDK
  owner?: Player;
  uuid?: string;
  hasStateBasedEffect?: boolean;
  hasEtbEffect?: boolean;
  keywords?: Array<string>; // could pull from Oracle text but this works too
  supertype?: string; // concat the supertypes array
  subtype?: string; // concatenation of subtypes array
}
