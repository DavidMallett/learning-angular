
// a class to read and interpret Oracle text
import { KeywordHelperService } from './services/keyword-helper.service';
import { Card } from './card';

// const sprinter = require('./creatures/RIX172.json');
const keywords = require('./keywords.json');
const abilities = require('./activatedAbilities.json');
const triggers = require('./triggeredAbilities.json');
const _ = require('lodash');

export class OracleText {

    public keywords: Array<string>;

  // let's try to write a class that parses Oracle text

    constructor(theKeywords: Array<string>) {
        for (let item of theKeywords) {
            item = item.toLowerCase();
            this.interpret(item);
        }
    }

    public getKeywordAbilities(theCard: Card): Array<string> {
        const result = [];
        for (let abil of theCard.keywords) {
            abil = abil.trim();
            if (abil !== '') {
                result.push(abil);
            }
        }
        return result;
    }

    public interpret(text: string): void {
        const words: Array<string> = text.split(' ');
        let readingTrigger = false;
        let readingCondition = false;
        let condition = '';
        const readingStaticEffect = false;


        _.each(words, (word: string) => {
          if (word === 'when' || word === 'whenever') {
            readingTrigger = true;
            readingCondition = true;
          } else if (word === '') {
          } else if (readingTrigger) {
            condition += word + ' ';
            if (word.includes(',')) {
              readingCondition = false;
            }
          }
          // todo: write logic to interpret Oracle text

          // if (this.keywords.includes(word)) {
          //   // run the keyword helper service (todo)
          // } else {
          //   // maybe put a switch statement here?
          // }
        });
    }

}
