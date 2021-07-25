import EventEmitter from "eventemitter3";

import LogFactory from "../model/loglines/logfactory";
import LogNetworkAbility from "../model/loglines/log_network_ability";
import LogNetworkBuff from "../model/loglines/log_network_buff";
import { Party as ActParty, addOverlayListener, startOverlayEvents } from "./overlay_listener";

declare global {
  interface Window {
    addOverlayListener: typeof addOverlayListener;
    startOverlayEvents: typeof startOverlayEvents;
  }
}


class ActionMonitor extends EventEmitter<Event> {
  inited: boolean;

  /** current party members */
  party: ActParty[];

  constructor() {
    super();

    this.inited = false;
    this.party = [];
  }

  emit<T extends Event>(event: T, ...args: Parameters<EventMap[T]>): boolean {
    return super.emit(event, ...args);
  }

  on<T extends Event>(event: T, callback: EventMap[T]): this {
    super.on(event, callback);
    return this;
  }

  once<T extends Event>(event: T, callback: EventMap[T]): this {
    super.once(event, callback);
    return this;
  }

  off<T extends Event>(event: T, callback: EventMap[T]): this {
    super.off(event, callback);
    return this;
  }

  onPartyChanged(party: ActParty[]) {
    console.log(party);
    // TODO: This array might contain non-party members?
    this.party = party.filter((member: ActParty): boolean => {
      return member.inParty;
    });
  }

  onNetLog(line: string[], _rawLine: string) {
    const log = LogFactory.getLog(line);

    if (log instanceof LogNetworkAbility) {
      if (this.isPartyMember(log.sourceId)) {
        this.emit("UsedAction", log.sourceId, log.id, log);
      }
    }
  }

  isPartyMember(id?: string): boolean {
    if (!id) return false;
    return this.party.some((member) => member.id === id);
  }

  
  registerListeners(): void {
    window.addOverlayListener("LogLine", (ev) => {
      this.onNetLog(ev.line, ev.rawLine);
    });

    window.addOverlayListener("PartyChanged", (ev) => {
      this.onPartyChanged(ev.party);
    });

    // registered all the listeners
    // start the overlay
    window.startOverlayEvents();
  }
}

export const monitor = new ActionMonitor();

export interface EventMap {
  "UsedAction"(actor: string, actionId: string, log: LogNetworkAbility): void;
  "GainEffect"(actor: string, effectId: string, log: LogNetworkBuff): void;
}

export type Event = keyof EventMap;
