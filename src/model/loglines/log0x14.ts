import Base from "./base";

/**
 * Log type 0x14 Network Starts Casting
 * 
 * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#14-networkstartscasting
 */
class Log0x14 extends Base {
  constructor(loglines: string[]) {
    super(loglines);
  }

  get sourceId() {
    return this.lines[2];
  }

  get source() {
    return this.lines[3];
  }

  get id() {
    return this.lines[4];
  }

  get ability() {
    return this.lines[5];
  }

  get targetId() {
    return this.lines[6];
  }

  get target() {
    return this.lines[7];
  }

  get castTime() {
    return this.lines[8];
  }
}

export default Log0x14;
