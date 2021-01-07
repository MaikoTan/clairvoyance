import Base from "./base";
import LogChangeZone from "./log_change_zone";
import LogPlayerStats from "./log_player_stats";
import LogNetworkStartsCasting from "./log_network_starts_casting";
import LogNetworkAbility from "./log_network_ability";
import LogNetworkDeath from "./log_network_death";
import LogNetworkBuff from "./log_network_buff";
import LogNetworkBuffRemove from "./log_network_buff_remove";
import LogNetworkStatusEffects from "./log_network_status_effects";

class LogFactory {
  getLog(loglines: string[]): Base {
    switch (parseInt(loglines[0])) {
    case 0x01:
      return new LogChangeZone(loglines);

    case 0x0C:
      return new LogPlayerStats(loglines);

    case 0x14:
      return new LogNetworkStartsCasting(loglines);

    case 0x15:
    case 0x16:
      return new LogNetworkAbility(loglines);

    case 0x19:
      return new LogNetworkDeath(loglines);

    case 0x1A:
      return new LogNetworkBuff(loglines);

    case 0x1E:
      return new LogNetworkBuffRemove(loglines);

    case 0x26:
      return new LogNetworkStatusEffects(loglines);

    default:
      return new Base(loglines);
    }
  }
}

export default LogFactory;
