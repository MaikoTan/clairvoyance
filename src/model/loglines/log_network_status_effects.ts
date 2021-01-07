import Base from "./base";

/**
 * Log type 0x26 Network Status Effects
 * 
 * Prefer gainsEffect over this function unless you really need extra data.
 * 
 * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#26-networkstatuseffects
 */
class LogNetworkStatusEffects extends Base {
  constructor(loglines: string[]) {
    super(loglines);
  }

  get targetId() {
    return this.lines[2];
  }

  get target() {
    return this.lines[3];
  }

  get hp() {
    return this.lines[5];
  }

  get maxHp() {
    return this.lines[6];
  }

  get x() {
    return this.lines[11];
  }

  get y() {
    return this.lines[12];
  }

  get z() {
    return this.lines[13];
  }

  get heading() {
    return this.lines[14];
  }

  get data0() {
    return this.lines[15];
  }

  get data1() {
    return this.lines[16];
  }

  get data2() {
    return this.lines[17];
  }

  get data3() {
    return this.lines[18];
  }

  get data4() {
    return this.lines[19];
  }
}

export default LogNetworkStatusEffects;
