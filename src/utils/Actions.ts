import { addOverlayListener } from "./ACTListener";
import { NetRegexes } from "./Regexes";

declare global {
  interface Window {
    addOverlayListener: typeof addOverlayListener;
  }
}

class ActionMonitor {
  init: boolean;
  kAnybodyUseAbility: RegExp;

  constructor() {
    this.init = false;

    this.kAnybodyUseAbility = NetRegexes.ability({ capture: true });

    window.addOverlayListener("LogLine", (ev: {
      line: string[],
      rawLine: string,
    }) => {
      if (!this.init) return;
      this.onLog(ev.line, ev.rawLine);
    });
  }

  onLog(line: string[], rawLine: string) {
    const type = line[0];

    switch (type) {
    case "21":
    case "22":
      // Used some action
      if (rawLine.match(this.kAnybodyUseAbility)) {
        // TODO check if party member
      }
      break;
    default:
      break;
    }
  }
}

export {
  ActionMonitor,
};
