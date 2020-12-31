import { addOverlayListener, startOverlayEvents, Party as ACTParty } from "./ACTListener";
import { NetRegexes } from "./Regexes";

declare global {
  interface Window {
    addOverlayListener: typeof addOverlayListener;
    startOverlayEvents: typeof startOverlayEvents;
  }
}

const registerListeners = (monitor: ActionMonitor) => {
  window.addOverlayListener("LogLine", (ev: {
    line: string[],
    rawLine: string,
  }) => {
    monitor.onNetLog(ev.line, ev.rawLine);
  });

  window.addOverlayListener("PartyChanged", (ev: {
    party: ACTParty[],
  }) => {
    monitor.onPartyChanged(ev.party);
  });

  // registered all the listeners
  // start the overlay
  window.startOverlayEvents();
};


class ActionMonitor {
  inited: boolean;

  /** current party members */
  party: ACTParty[];

  /** Regex to match anybody casted ability */
  kAnybodyUseAbility: RegExp;

  constructor() {
    this.inited = false;
    this.party = [];

    this.kAnybodyUseAbility = NetRegexes.ability({ capture: true });
  }

  onPartyChanged(party: ACTParty[]) {
    // TODO: This array might contain non-party members?
    this.party = party.filter((member: ACTParty): boolean => {
      return member.inParty;
    });
  }

  onNetLog(line: string[], rawLine: string) {

    const isPartyMember = (id?: string): boolean => {
      if (!id) return false;
      for (const member of this.party) {
        if (id == member.id) {
          return true;
        }
      }
      return false;
    };

    /** log type, in decimal (not hex) */
    const type = line[0];

    if (type == "21" || type == "22") {
      // matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#15-networkability
      // matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#16-networkaoeability
      const m = rawLine.match(this.kAnybodyUseAbility);
      if (m) {
        if (isPartyMember(m.groups?.sourceId)) {
          // TODO: dispatch to timer?
        }
      }
    }
  }
}

export {
  ActionMonitor,
  registerListeners,
};