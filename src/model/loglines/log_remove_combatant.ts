import Base from "./base";

/**
 * Log type 0x04 Remove Combatant
 * 
 * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#04-removecombatant
 */
class LogRemoveCombatant extends Base {
  constructor(loglines: string[]) {
    super(loglines);
  }

  get id() {
    return this.lines[2];
  }

  get name() {
    return this.lines[3];
  }

  get hp() {
    return this.lines[12];
  }
}

export default LogRemoveCombatant;