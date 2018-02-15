import { OracleText } from './oracleText.js';
import { Player } from './player';

export class Card {
  type: string;
  uuid?: string;
  supertype?: string;
  subtype?: string;
  name: string;
  power?: number;
  toughness?: number;
  manaCost?: string;
  convertedManaCost: number;
  colors?: Array<string>;
  isPermanent?: boolean;
  keywords?: Array<string>;
  oracleText?: OracleText;
  rarity?: string;
  artist?: string;
  hasStateBasedEffect?: boolean;
  hasEtbEffect?: boolean;
  legality?: string[];
  owner?: Player;
  controller?: Player;
  zone?: string;
  isArtifactCreature?: boolean;
}
