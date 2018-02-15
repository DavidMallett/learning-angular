import { Player } from '../player';
import { Battlefield } from './battlefield.class';
import { Permanent, Creature } from './permanent.component';
import * as uuid from 'uuid';
const _ = require('lodash');

const uuidv4 = require('uuid/v4');

export class GameInstance {
  public uuid: string;
  public players: Player[];
  public format: string;
  public objects: Permanent[];
  public battlefield: Battlefield;
  public activePlayer: Player;

  constructor(format: string, players: Player[]) {
    this.format = format;
    this.uuid = uuidv4();
    this.objects = [];
    this.players = players;
    this.battlefield = new Battlefield(this.uuid);
  }

  public addObject(object: Permanent): void {
    this.objects.push(object);
  }

  public getObject(id: string): Permanent {
    for (let i = 0; i < this.objects.length; i++) {
      if (this.objects[i].uuid === id) {
        return this.objects[i];
      }
    }
  }

  public setActivePlayer(player: Player): void {
    this.activePlayer = player;
  }

  public getActivePlayer(): Player {
    return this.activePlayer;
  }

  public removeObject(id: string): void {
    _.remove(this.objects, (o) => o.uuid === id);
  }

  public allObjects(): Permanent[] {
    return this.objects;
  }

  // public removeObject(objectId: string): void {
  //   const index = this.objects.indexOf(objectId);
  //   if (index > -1) {
  //     this.objects.splice(index, 1);
  //   }
  // }

  public lookup(theId: string) {

  }

  public applyStateBasedActions(): void { // consider returning a Promise to make this thenable
    for (let i = 0; i < this.objects.length; i++) {
      // check for lethal damage or toughness below 1
      if (this.objects[i].type === 'creature') {
        if (this.objects[i].damage > this.objects[i].toughness || this.objects[i].toughness < 1) {
          this.objects[i].die();
          _.pull(this.objects, this.objects[i]);
        }
      }
      // check for legend rule
      if (this.objects[i].supertype !== null && this.objects[i].supertype === 'legendary') {
        
      }

      }
    }
  }

  public applyDamageToObject(objectId: string, amount: number): void {
    if()
    
    if ('toughness' in )
  }
}

/*
*
*
*
*
*
*
*
*
*/
