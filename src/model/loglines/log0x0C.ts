import Base from "./base";

/**
 * Log type 0x0C Player Stats
 * 
 * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#0c-playerstats
 */
class Log0x0C extends Base {
  constructor(loglines: string[]) {
    super(loglines);
  }

  get job() {
    return this.lines[2];
  }

  get strength() {
    return this.lines[3];
  }

  get dexterity() {
    return this.lines[4];
  }

  get vitality() {
    return this.lines[5];
  }

  get intelligence() {
    return this.lines[6];
  }

  get mind() {
    return this.lines[7];
  }

  get piety() {
    return this.lines[8];
  }

  get attackPower() {
    return this.lines[9];
  }

  get directHit() {
    return this.lines[10];
  }

  get criticalHit() {
    return this.lines[11];
  }

  get attackMagicPotency() {
    return this.lines[12];
  }

  get healMagicPotency() {
    return this.lines[13];
  }

  get determination() {
    return this.lines[14];
  }

  get skillSpeed() {
    return this.lines[15];
  }

  get spellSpeed() {
    return this.lines[16];
  }

  get tenacity() {
    return this.lines[18];
  }
}

export default Log0x0C;
