import Base from "./base";

/**
 * Log type 0x03 Add Combatant
 * 
 * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#03-addcombatant
 */
class LogAddCombatant extends Base {
  constructor(loglines: string[]) {
    super(loglines);
  }

  get id() {
    return this.lines[2];
  }

  get name() {
    return this.lines[3];
  }

  get job() {
    return this.lines[4];
  }

  get level() {
    return this.lines[5];
  }

  get ownerId() {
    return this.lines[6];
  }

  get world() {
    return this.lines[8];
  }

  get npcNameId() {
    return this.lines[9];
  }

  get npcBaseId() {
    return this.lines[10];
  }

  get currentHp() {
    return this.lines[11];
  }

  get hp() {
    return this.lines[12];
  }

  get x() {
    return this.lines[17];
  }

  get y() {
    return this.lines[18];
  }

  get z() {
    return this.lines[19];
  }

  get heading() {
    return this.lines[20];
  }
}

export default LogAddCombatant;