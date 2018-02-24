import { Player } from '../player';
import { Phase } from '../phase.class';
import { Permanent, Creature, Artifact, Enchantment } from '../core/permanent.component';
import { Battlefield } from '../core/battlefield.class';
import { TheStack } from '../core/theStack';
import { Cost } from '../kersplat/cost.class';
import { ManaCost } from '../core/mana-cost.class';
import * as _ from 'lodash';

export class Parser {

  // todo: constructor, properties
  public constructor() {
    // no properties
  }

  public parseManaCost(mana: string): ManaCost {
    let tokens: Array<string> = [];
    if (mana.indexOf('{') > 0 || mana.indexOf('}') > 0) {
      // check for and strip out curly braces
      tokens = this.convertCostStringToTokenArray(mana);
    } else {
      tokens = mana.split('');
    }

    return this.parseTokenArray(tokens);
  }

  public convertCostStringToTokenArray(mc: string): Array<string> {
    // case 1: {1}{U}{U}{U}

    const arr: Array<string> = mc.split('');
    let makingToken = false;
    let current = '';
    const tokens: Array<string> = [];
    _.each(arr, (char: string, index: number) => {
      switch (char) {
        case '{':
          // start creating a token
          makingToken = true;
          break;
        case '}':
          makingToken = false;
          tokens.push(current);
          current = '';
          break;
        default:
          if (makingToken) {
            current += char;
          }
          break;
      }
    });
    return tokens;
  }

  public parseTokenArray(tokens: Array<string>): ManaCost {
    const cost: ManaCost = new ManaCost();
    // case 2: 2RUG, 3UU, etc
    // case 3: X costs (XR, XX, etc)
    _.each(tokens, (symbol: string, index: number) => {
      switch (symbol) {
        case 'W': // one white mana
          cost.whiteCost++;
          break;
        case 'U': // one blue mana
          cost.blueCost++;
          break;
        case 'R': // one red mana
          cost.redCost++;
          break;
        case 'B': // one black mana
          cost.blackCost++;
          break;
        case 'G': // one green mana
          cost.greenCost++;
          break;
        case 'C': // one colorless mana
          cost.colorlessCost++;
          break;
        case 'X': // X units of generic mana
          cost.genericCost += parseInt(prompt('input a numeric value for x'), 10);
          break;
        default:
          // case 4: Phyrexian mana {G/P}, {W/P}, etc
          // case 5: Hybrid mana {U/R}, {2/W}, etc
          if (!isNaN(parseInt(symbol, 10))) { // if it is a number
            cost.genericCost += parseInt(symbol, 10);
          } else if (symbol.length > 2) {
            if (symbol.substring(1) === '/P') {
              // phyrexian mana cost
              let decision = prompt('Pay 2 life? Y/N');
              decision = decision.toUpperCase();
              if (decision === 'Y') {
                cost.phyrexianLifeLoss += 2;
              } else {
                tokens.push(symbol.substring(0, 1)); // add a new token to the end of the array
                // ^^ may or may not be iterated through - need unit tests here
              }
            } else if (symbol.substring(0, 2) === '2/') {
              let decision = prompt('Pay {2} instead of colored mana? Y/N');
              decision = decision.toUpperCase();
              if (decision === 'Y') {
                cost.genericCost += 2;
              } else {
                tokens.push(symbol.substring(2));
                // see above comment
              }
            }
          } else {
            throw new Error(symbol + ' is not a recognized symbol');
          }
      }
    });
    return cost;
  }

}
