import Base from "./base";

/**
 * Log type 0x1B Head Marker
 * 
 * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#1b-networktargeticon-head-markers
 */
class LogNetworkHeadMarker extends Base {
  constructor(loglines: string[]) {
    super(loglines);
  }

  get targetId() {
    return this.lines[2];
  }

  get target() {
    return this.lines[3];
  }

  get id() {
    return this.lines[6];
  }
}

export default LogNetworkHeadMarker;