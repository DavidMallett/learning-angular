// import { Cost } from '../kersplat/cost.class';
// import { ManaCost } from '../core/mana-cost.class';
// import * as _ from 'lodash';
const _ = require('lodash');

export class Parser {

  // todo: constructor, properties
  public constructor() {
    // no properties
  }

  // todo: move this to Cost class
  // public parseCostDescriptor(desc: string, theCost: Cost): Cost {
  //   const descArray: Array<string> = desc.split(':');
  //   // costs can be written as colon-separated strings and this method should parse them back into a Cost
  //   // i.e. "mana:3{U}{B}:life:2:cards:1"
  //   // let currentOp = 'starting';
  //   _.each(descArray, (str: string, index: number) => {
  //     // current idea: don't worry about when the iterator lands on the blocks of mana or numbers;
  //     // only perform actions when running into a keyword
  //     switch (str) {
  //       case 'mana':
  //         this.parseManaCost(descArray[index + 1]);
  //         break;
  //       case 'life':
  //         theCost.lifeCost += parseInt(descArray[index + 1], 10);
  //         break;
  //       case 'cards':
  //         theCost.discardCost += parseInt(descArray[index + 1], 10);
  //         break;
  //     }
  //   });

  //   return theCost;
  // }

  // public parseManaCost(mana: string): ManaCost {
  //   let tokens: Array<string> = [];
  //   if (mana.indexOf('{') > 0 || mana.indexOf('}') > 0) {
  //     // check for and strip out curly braces
  //     tokens = this.convertCostStringToTokenArray(mana);
  //   } else {
  //     tokens = mana.split('');
  //   }

  //   return this.parseTokenArray(tokens);
  // }

  public convertCostStringToTokenArray(mc: string): Array<string> {
    // case 1: {1}{U}{U}{U}
    // note: if there are no brackets, use parseManaCost instead
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

  // vvvv Moved to ManaCost.class
  // public parseTokenArray(tokens: Array<string>): ManaCost {
  //   const cost: ManaCost = new ManaCost();
  //   // case 2: 2RUG, 3UU, etc
  //   // case 3: X costs (XR, XX, etc)
  //   _.each(tokens, (symbol: string, index: number) => {
  //     switch (symbol) {
  //       case 'W': // one white mana
  //         cost.whiteCost++;
  //         break;
  //       case 'U': // one blue mana
  //         cost.blueCost++;
  //         break;
  //       case 'R': // one red mana
  //         cost.redCost++;
  //         break;
  //       case 'B': // one black mana
  //         cost.blackCost++;
  //         break;
  //       case 'G': // one green mana
  //         cost.greenCost++;
  //         break;
  //       case 'C': // one colorless mana
  //         cost.colorlessCost++;
  //         break;
  //       case 'X': // X units of generic mana
  //         cost.genericCost += parseInt(prompt('input a numeric value for x'), 10);
  //         break;
  //       default:
  //         // case 4: Phyrexian mana {G/P}, {W/P}, etc
  //         // case 5: Hybrid mana {U/R}, {2/W}, etc
  //         if (!isNaN(parseInt(symbol, 10))) { // if it is a number
  //           cost.genericCost += parseInt(symbol, 10);
  //         } else if (symbol.length > 2) {
  //           if (symbol.substring(1) === '/P') {
  //             // phyrexian mana cost
  //             let decision = prompt('Pay 2 life? Y/N');
  //             decision = decision.toUpperCase();
  //             if (decision === 'Y') {
  //               cost.phyrexianLifeLoss += 2;
  //             } else {
  //               tokens.push(symbol.substring(0, 1)); // add a new token to the end of the array
  //               // ^^ may or may not be iterated through - need unit tests here
  //             }
  //           } else if (symbol.substring(0, 2) === '2/') {
  //             let decision = prompt('Pay {2} instead of colored mana? Y/N');
  //             decision = decision.toUpperCase();
  //             if (decision === 'Y') {
  //               cost.genericCost += 2;
  //             } else {
  //               tokens.push(symbol.substring(2));
  //               // see above comment
  //             }
  //           }
  //         } else {
  //           throw new Error(symbol + ' is not a recognized symbol');
  //         }
  //     }
  //   });
  //   return cost;
  // }

}
