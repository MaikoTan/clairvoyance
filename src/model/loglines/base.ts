class Base {

  /** cache log lines */
  lines: string[];

  /** log type (decemble) */
  type: number;

  typename: string;

  /** timestamp */
  timestamp: string;

  constructor(logline: string[]) {
    this.lines = logline;
    this.type = parseInt(this.lines[0], 10);
    this.timestamp = this.lines[1];
    this.typename = "null";
  }
}

export default Base;
