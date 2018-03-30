import { Hand } from './hand';
import { Card } from './card';
import { Player } from './player';
import { Permanent, Creature, Land, Artifact, Enchantment } from './core/permanent.component';
import { Deck } from './deck.component';
import { Battlefield } from './core/battlefield.class';
import { GameInstance } from './core/game-instance.class';
import * as uuid from 'uuid';
import { DeckBuilderService } from './services/deck-builder.service';

const uuidv4 = require('uuid/v4');
const lib: Array<Card> = [];
const dbs = new DeckBuilderService();
// todo: find a way other than "dbs.readDeckFromJson" to parse decklists
// const esperShadow: Deck = dbs.readDeckFromJson('Esper Shadow', '../decks/espershadow.json');
// const grixisShadow: Deck = dbs.readDeckFromJson('Grixis Shadow', '../decks/grixisshadow.json');

// const player1: Player = new Player('David', esperShadow);
// const player2: Player = new Player('Computer', grixisShadow);

// const theGame: GameInstance = new GameInstance('modern', [player1, player2]);

// theGame.start();
// -----

// NOTE: Ignore this file! Use ../main.ts (root/src/main.ts) instead of this one (root/src/app/main.ts)!


/**
 * Pseudocode:
 *
 * const deck1 = Deck.generate('./deck1/')
 * const deck2 = Deck.generate('./deck2/')
 * // Make a static generate method that takes all the JSON files in a directory
 * // and turns them into a deck.
 * const player1: Player = new Player(deck1);
 * const player2: Player = new Player(deck2);
 * const theGame = new GameInstance('standard', [player1, player2]);
 * const theStack = [];
 * player1.draw7();
 * player2.draw7();
 * let currentPhase = 'main';
 *
 *
 *
 *
 *
 *
 */
