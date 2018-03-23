import { Player } from '../player';
// import { GameInstance } from '../core/game-instance.class';
import { Logger } from '../util/logger.util';
const uuid = require('uuid/v4');
const _ = require('lodash');

// this class is probably unnecessary

export class Match {
  public static currentMatch: Match;

  // public currentGame: GameInstance;
  // public games: Array<GameInstance>;
  public gameWins: Array<Player>;
  public winner?: Player;
  public players: Array<Player>;
  public id: string;
  public format: string;

  public constructor(players: Array<Player>) {
    this.id = uuid();
    this.players = players;
    // this.currentGame = new GameInstance(this.format, this.players);
    // this.games.push(this.currentGame);
    Match.currentMatch = this;
  }

  public static current(): Match {
    return Match.currentMatch;
  }

  // public winGame(p: Player): void {
  //   this.gameWins.push(p);
  //   // this.currentGame.end();
  //   Logger.gLog(p.name + ' won the game!');
  //   if (this.games.length > 2) {
  //     this.determineWinner();
  //   }
  // }

  public winMatch(p: Player): void {
    this.winner = p;
  }

  public determineWinner(): void {
    // todo: add logic to determine winner based on game wins
  }

  // public startNextGame(format: string): GameInstance {
  //   const newGame: GameInstance = new GameInstance(format, this.players);
  //   this.currentGame = newGame;
  //   this.games.push(newGame);
  //   return newGame;
  // }

}
