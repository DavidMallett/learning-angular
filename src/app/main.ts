import { Hand } from './hand';
import { Card } from './card';
import { Permanent, Creature, Land, Artifact, Enchantment } from './core/permanent.component';
import { Deck } from './deck.component';
import { Battlefield } from './core/battlefield.class';
import { GameInstance } from './core/game-instance.class';
import * as uuid from 'uuid';

const uuidv4 = require('uuid/v4');
const deck1 = [];


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