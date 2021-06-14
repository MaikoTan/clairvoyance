import Base from "./base";

/**
 * Log type 0x1A Network Buff
 * 
 * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#1a-networkbuff
 */
class LogNetworkBuff extends Base {
  constructor(loglines: string[]) {
    super(loglines);
  }

  get effectId() {
    return this.lines[2];
  }

  get effect() {
    return this.lines[3];
  }

  get duration() {
    return this.lines[4];
  }

  get sourceId() {
    return this.lines[5];
  }

  get source() {
    return this.lines[6];
  }

  get targetId() {
    return this.lines[7];
  }

  get target() {
    return this.lines[8];
  }

  get count() {
    return this.lines[9];
  }
}

export default LogNetworkBuff;
