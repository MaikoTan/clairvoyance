import Base from "./base";

/**
 * Log type 0x15 / 0x16 Network (AoE) Ability
 * 
 * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#15-networkability
 * 
 * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#16-networkaoeability
 */
class Log0x15 extends Base {
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

  get flags() {
    return this.lines[8];
  }

  get damage() {
    return this.lines[9];
  }

  get targetCurrentHp() {
    return this.lines[24];
  }

  get targetMaxHp() {
    return this.lines[25];
  }

  get x() {
    return this.lines[40];
  }

  get y() {
    return this.lines[41];
  }

  get z() {
    return this.lines[42];
  }

  get heading() {
    return this.lines[43];
  }
}

export default Log0x15;
