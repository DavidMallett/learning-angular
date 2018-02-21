
// a class to read and interpret Oracle text

import { Card } from './card';

const sprinter = require('./creatures/RIX172.json');
const keywords = require('./keywords.json');
const abilities = require('./activatedAbilities.json');
const triggers = require('./triggeredAbilities.json');
const _ = require('lodash');

export class OracleText {

    public keywords: Array<string>;

    constructor(theKeywords: Array<string>) {
        for (let item of theKeywords) {
            item = item.toUpperCase();
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
        _.each(words, (word: string) => {
          if (this.keywords.includes(word)) {
            // run the keyword helper service (todo)
          } else {
            // maybe put a switch statement here?
          }
        });
    }

}
