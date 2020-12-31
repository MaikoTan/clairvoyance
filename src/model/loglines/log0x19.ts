import Base from "./base";

/**
 * Log type 0x19 Network Death
 * 
 * 'target' was defeated by 'source'
 * 
 * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#19-networkdeath
 */
class Log0x19 extends Base {
  constructor(loglines: string[]) {
    super(loglines);
  }

  get targetId() {
    return this.lines[2];
  }

  get target() {
    return this.lines[3];
  }

  get sourceId() {
    return this.lines[4];
  }

  get source() {
    return this.lines[5];
  }
}

export default Log0x19;
