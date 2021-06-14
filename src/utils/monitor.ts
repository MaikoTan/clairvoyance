import LogFactory from "../model/loglines/logfactory";
import LogNetworkAbility from "../model/loglines/log_network_ability";
import { Party as OverlayParty, addOverlayListener, startOverlayEvents } from "./overlay_listener";

declare global {
  interface Window {
    addOverlayListener: typeof addOverlayListener;
    startOverlayEvents: typeof startOverlayEvents;
  }
}

const registerListeners = (monitor: ActionMonitor) => {
  window.addOverlayListener("LogLine", (ev) => {
    monitor.onNetLog(ev.line, ev.rawLine);
  });

  window.addOverlayListener("PartyChanged", (ev) => {
    monitor.onPartyChanged(ev.party);
  });

  // registered all the listeners
  // start the overlay
  window.startOverlayEvents();
};


class ActionMonitor {
  inited: boolean;

  /** current party members */
  party: OverlayParty[];

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

  onPartyChanged(party: OverlayParty[]) {
    console.log(party);
    // TODO: This array might contain non-party members?
    this.party = party.filter((member: OverlayParty): boolean => {
      return member.inParty;
    });
  }

  onNetLog(line: string[], _rawLine: string) {

    const log = LogFactory.getLog(line);

    if (log instanceof LogNetworkAbility) {
      if (this.isPartyMember(log.sourceId)) {
        this.onActionUsed({
          sourceId: log.sourceId,
          actionId: log.id,
        });
      }
    }
  }

  isPartyMember(id?: string): boolean {
    if (!id) return false;
    return this.party.some((member) => member.id === id);
  }
}

export {
  ActionMonitor,
  registerListeners,
};
