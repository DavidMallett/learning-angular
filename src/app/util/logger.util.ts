import { Injectable } from '@angular/core';

const fs = require('fs');
const _ = require('lodash');

@Injectable()
export class Logger {
  public static globalLogs: Array<string>;
  public logs: Array<string>;

  constructor() {
    this.logs = [];
  }

  public static gLog(str: string): void {
    Logger.globalLogs.push(str);
  }

  public static gWrite(name: string): void {
    fs.appendFile(name, _.join(Logger.globalLogs, '\n', (err) => {
      if (err) { throw err; }
    }));
  }

  public static getObjectType(obj: any): string {
    return (obj.prototype.constructor.name);
  }

  public log(str: string) {
    this.logs.push(str);
  }

  public writeToDisk(filename: string): void {
    fs.appendFile(filename, this.logs, (err) => {
      if (err) { throw err; }
      // logs now appended to logs.txt
    });
  }

}
