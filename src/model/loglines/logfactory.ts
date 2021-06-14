import Base from "./base";
import LogChangeZone from "./log_change_zone";
import LogAddCombatant from "./log_add_combatant";
import LogRemoveCombatant from "./log_remove_combatant";
import LogPlayerStats from "./log_player_stats";
import LogNetworkStartsCasting from "./log_network_starts_casting";
import LogNetworkAbility from "./log_network_ability";
import LogNetworkDeath from "./log_network_death";
import LogNetworkBuff from "./log_network_buff";
import LogNetworkHeadMarker from "./log_network_head_marker";
import LogNetworkBuffRemove from "./log_network_buff_remove";
import LogNetworkStatusEffects from "./log_network_status_effects";

enum LogType {
  ChangeZone = 0x01,
  AddCombatant = 0x03,
  RemoveCombatant = 0x04,
  PlayerStats = 0x0C,
  NetworkStartsCasting = 0x14,
  NetworkAbility = 0x15,
  NetworkAoeAbility = 0x16,
  NetworkDeath = 0x19,
  NetworkBuff = 0x1A,
  NetworkHeadMarker = 0x1B,
  NetworkBuffRemove = 0x1E,
  NetworkStatusEffects = 0x26,
}

class LogFactory {
  getLog(loglines: string[]): Base {
    switch (parseInt(loglines[0])) {
    case LogType.ChangeZone:
      return new LogChangeZone(loglines);

    case LogType.AddCombatant:
      return new LogAddCombatant(loglines);

    case LogType.RemoveCombatant:
      return new LogRemoveCombatant(loglines);

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

    case LogType.NetworkHeadMarker:
      return new LogNetworkHeadMarker(loglines);

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
