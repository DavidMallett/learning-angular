
// a class to read and interpret Oracle text

import { Card } from './card';

const sprinter = require('./creatures/RIX172.json');
const keywords = require('./keywords.json');
const abilities = require('./activatedAbilities.json');
const triggers = require('./triggeredAbilities.json');

export class OracleText {

    public keywords: Array<string>;

    constructor(theKeywords: Array<string>) {
        for (let item of theKeywords) {
            item = item.toUpperCase();
            interpret(item);
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


    function

    public interpret(text: string): void {
        let tmp = text.split(' ');
        for (let item of tmp) {
            if (this.keywords.includes(item)) {
                
            }
        }
        for (let i = 0; i < tmp.length; i++) {
            let current = tmp[i];
            switch (tmp[i]) {
                case(current === keywords.keywords[current])
            }
        }
    }

    public 

}