import { addOverlayListener } from "./ACTListener";

declare global {
  interface Window {
    addOverlayListener: typeof addOverlayListener;
  }
}

class ActionMonitor {
  constructor() {
    window.addOverlayListener("LogLine", (ev: {
      line: string[],
      rawLine: string,
    }) => {
      this.onLog(ev.line, ev.rawLine);
    });
  }

  onLog(line: string[], rawLine: string) {
    const type = line[0];

    switch (type) {
    case "21":
    case "22":
      // Use some action
      
      break;
    default:
      break;
    }
  }
}

export {
  ActionMonitor,
};
