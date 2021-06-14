import Base from "./base";

/**
 * Log type 0x01 Change Zone
 * 
 * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#01-changezone
 */
class LogChangeZone extends Base {
  constructor(loglines: string[]) {
    super(loglines);
  }

  get id() {
    return this.lines[2];
  }

  get name() {
    return this.lines[3];
  }
}

export default LogChangeZone;
