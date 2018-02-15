import { Card } from './card';

export class CreatureCard implements Card {
    public type: string;
    public name: string;

    constructor(cardJson: CreatureModel) {
        this.type = cardJson.type;
        this.
    }
}
