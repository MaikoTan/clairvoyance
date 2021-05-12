import { Party as ACTParty, addOverlayListener, startOverlayEvents } from "./ACTListener";

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

  /** Callback when actionUsed event */
  actionUsedCallbacks: Function[];

  /** Callback when gainBuff event */
  gainBuffCallbacks: Function[];

  constructor() {
    this.inited = false;
    this.party = [];

    this.actionUsedCallbacks = [];
    this.gainBuffCallbacks = [];
  }

  on(event: "ActionUsed", callback: (actor: string, id: string) => void): () => void;
  on(event: "GainBuff", callback: (actor: string, id: string) => void): () => void;
  on(event: string, callback: (...arg: any[]) => void): (() => void) | void {
    if (event === "ActionUsed") {
      this.actionUsedCallbacks.push(callback);

      return () => {
        this.actionUsedCallbacks = this.actionUsedCallbacks.slice(this.actionUsedCallbacks.indexOf(callback), 1);
      };

    } else if (event === "GainBuff") {
      this.gainBuffCallbacks.push(callback);

      return () => {
        this.gainBuffCallbacks = this.gainBuffCallbacks.slice(this.gainBuffCallbacks.indexOf(callback), 1);
      };

    }
  }

  onActionUsed(o: {
    sourceId?: string,
    actionId?: string,
  }) {
    const {
      sourceId,
      actionId
    } = o;

    this.actionUsedCallbacks.forEach((func) => {
      if (func) {
        func(sourceId, actionId);
      }
    });
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
      return this.party.some((member) => member.id === id);
    };

    /** log type, in decimal (not hex) */
    const type = line[0];

    if (type === "21" || type === "22") {
      // matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#15-networkability
      // matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#16-networkaoeability
      // const m = rawLine.match(this.kAnybodyUseAbility);
      // if (m) {
      //   if (isPartyMember(m.groups?.sourceId)) {
      //     this.onActionUsed({
      //       sourceId: m.groups?.sourceId,
      //       actionId: m.groups?.id,
      //     });
      //   }
      // }
    }
  }
}

export {
  ActionMonitor,
  registerListeners,
};
