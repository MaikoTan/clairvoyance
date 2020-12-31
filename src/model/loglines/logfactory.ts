import Base from "./base";
import Log0x01 from "./log0x01";
import Log0x0C from "./log0x0C";
import Log0x14 from "./log0x14";
import Log0x15 from "./log0x15";
import Log0x19 from "./log0x19";
import Log0x1A from "./log0x1A";
import Log0x1E from "./log0x1E";
import Log0x26 from "./log0x26";

class LogFactory {
  getLog(loglines: string[]): Base {
    switch (parseInt(loglines[0])) {
    case 0x01:
      return new Log0x01(loglines);

    case 0x0C:
      return new Log0x0C(loglines);

    case 0x14:
      return new Log0x14(loglines);

    case 0x15:
    case 0x16:
      return new Log0x15(loglines);

    case 0x19:
      return new Log0x19(loglines);

    case 0x1A:
      return new Log0x1A(loglines);

    case 0x1E:
      return new Log0x1E(loglines);

    case 0x26:
      return new Log0x26(loglines);

    default:
      return new Base(loglines);
    }
  }
}

export default LogFactory;
