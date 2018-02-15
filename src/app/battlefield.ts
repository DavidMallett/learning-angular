import { Deck } from './deck';
import { Card } from './card';

export class Battlefield {
    public activePlayer: string; // implement player class
    public players: Array<Player>;
    public permanents: Array<Permanent>; // implement permanent
    public theStack: Array<Card>;
    public currentPhase: Phase; // implement phase

    constructor() { }

    public nextPhase(): void {

    }

    public takeAction(action): void {

    }

}

