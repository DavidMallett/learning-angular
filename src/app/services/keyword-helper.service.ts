import { Permanent, Creature, Artifact, Enchantment, Planeswalker, Land } from '../core/permanent.component';
import { Modifier } from '../core/modifier.class';
import { Logger } from '../util/logger.util';
import * as _ from 'lodash';

const creatureKeywords: Array<string> = require('./lists/creatureKeywords.json').creatureKeywords;

export class KeywordHelperService {

  // source may be able to be inferred based on keyword
  public parseArrayOfKeywords(keywords: Array<string>, source?: any): void {
    _.each(keywords, (word: string, index: number) => {
      if (creatureKeywords.indexOf(word) > 0) {
        this.creatureGainsKeyword(source, word);
      }
      // switch (word) {
      //   case 'trample':
      //     this.creatureGainsKeyword(source, 'trample');
      //     break;
      //   default:
      //     Logger.gLog(word + ' not accounted for by keywordHelperService. Uh-oh!');
      //     Logger.gWrite('./keywordHelperServiceFailures.txt');
      // }
    });
  }

  public creatureGainsKeyword(creature: Creature, keyword: string): void {
    creature.gains(keyword);
  }

  public creatureGetsPlusX(c: Creature, p: number, t: number): void {
    c.power += p;
    c.toughness += t;
  }

  public creatureGetsMinusX(c: Creature, p: number, t: number): void {
    c.power -= p;
    c.toughness -= t;
  }

  public hasHaste(c: Creature): boolean {
    return (c.keywords.indexOf('haste') > 0);
  }

  public cPlusOne(creature: Creature): void {
    creature.power++;
    creature.toughness++;
  }

}
