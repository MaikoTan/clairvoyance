class Base {

  /** cache log lines */
  lines: string[];

  /** log type (decemble) */
  type: number;

  /** timestamp */
  timestamp: string;

  constructor(logline: string[]) {
    this.lines = logline;
    this.type = parseInt(this.lines[0], 10);
    this.timestamp = this.lines[1];
  }
}

export default Base;
