const fs = require('fs');

export class Logger {
  public logs: Array<string>;

  constructor() {
    this.logs = [];
  }

  public log(str: string) {
    this.logs.push(str);
  }

  public writeToDisk(): void {
    fs.appendFile('logs.txt', this.logs, (err) => {
      if (err) { throw err; }
      // logs now appended to logs.txt
    });
  }
}
