import Base from "./base";
import LogChangeZone from "./log_change_zone";
import LogPlayerStats from "./log_player_stats";
import LogNetworkStartsCasting from "./log_network_starts_casting";
import LogNetworkAbility from "./log_network_ability";
import LogNetworkDeath from "./log_network_death";
import LogNetworkBuff from "./log_network_buff";
import LogNetworkBuffRemove from "./log_network_buff_remove";
import LogNetworkStatusEffects from "./log_network_status_effects";

enum LogType {
  ChangeZone = 0x01,
  PlayerStats = 0x0C,
  NetworkStartsCasting = 0x14,
  NetworkAbility = 0x15,
  NetworkAoeAbility = 0x16,
  NetworkDeath = 0x19,
  NetworkBuff = 0x1A,
  NetworkBuffRemove = 0x1E,
  NetworkStatusEffects = 0x26,
}

class LogFactory {
  getLog(loglines: string[]): Base {
    switch (parseInt(loglines[0])) {
    case LogType.ChangeZone:
      return new LogChangeZone(loglines);

    case LogType.PlayerStats:
      return new LogPlayerStats(loglines);

    case LogType.NetworkStartsCasting:
      return new LogNetworkStartsCasting(loglines);

    case LogType.NetworkAbility:
    case LogType.NetworkAoeAbility:
      return new LogNetworkAbility(loglines);

    case LogType.NetworkDeath:
      return new LogNetworkDeath(loglines);

    case LogType.NetworkBuff:
      return new LogNetworkBuff(loglines);

    case LogType.NetworkBuffRemove:
      return new LogNetworkBuffRemove(loglines);

    case LogType.NetworkStatusEffects:
      return new LogNetworkStatusEffects(loglines);

    default:
      return new Base(loglines);
    }
  }
}

export default LogFactory;
