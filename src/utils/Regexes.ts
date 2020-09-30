// Copy & modified from cactbot

const separator = "\\|";
const matchDefault = "[^|]*";

class Regexes {
  // Helper function for building named capture group regexes.
  static maybeCapture(
    capture: boolean,
    name: string,
    value: string,
    defaultValue?: string,
  ) {
    if (!value)
      value = defaultValue as string;
    value = Regexes.anyOf(value);
    return capture ? Regexes.namedCapture(name, value) : value;
  }

  // Creates a named regex capture group named |name| for the match |value|.
  static namedCapture(name: string, value: string) {
    if (name.includes(">"))
      console.error("\"" + name + "\" contains \">\".");
    if (name.includes("<"))
      console.error("\"" + name + "\" contains \">\".");

    return "(?<" + name + ">" + value + ")";
  }

  // Convenience for turning multiple args into a unioned regular expression.
  // anyOf(x, y, z) or anyOf([x, y, z]) do the same thing, and return (?:x|y|z).
  // anyOf(x) or anyOf(x) on its own simplifies to just x.
  // args may be strings or RegExp, although any additional markers to RegExp
  // like /insensitive/i are dropped.
  static anyOf(...args: string[]) {
    let array;
    if (args.length == 1) {
      if (!Array.isArray(args[0]))
        return args[0];
      array = args[0];
    } else {
      array = args;
    }

    let str = "(?:" + (array[0] instanceof RegExp ? array[0].source : array[0]);
    for (let i = 1; i < array.length; ++i)
      str += "|" + (array[i] instanceof RegExp ? array[i].source : array[i]);
    str += ")";
    return str;
  }

  static parse(regexpString: string | RegExp) {
    const kCactbotCategories: {
      [s: string]: string,
    } = {
      Timestamp: "^.{14}",
      NetTimestamp: ".{33}",
      NetField: "(?:[^|]*\\|)",
      LogType: "[0-9A-Fa-f]{2}",
      AbilityCode: "[0-9A-Fa-f]{1,8}",
      ObjectId: "[0-9A-F]{8}",
      Name: "[^\\s:|]+(?: [^\\s:|]+)?",
      // Floats can have comma as separator in FFXIV plugin output: https://github.com/ravahn/FFXIV_ACT_Plugin/issues/137
      Float: "-?[0-9]+(?:[.,][0-9]+)?(?:E-?[0-9]+)?",
    };

    // All regexes in cactbot are case insensitive.
    // This avoids headaches as things like `Vice and Vanity` turns into
    // `Vice And Vanity`, especially for French and German.  It appears to
    // have a ~20% regex parsing overhead, but at least they work.
    let modifiers = "i";
    if (regexpString instanceof RegExp) {
      modifiers += (regexpString.global ? "g" : "") +
        (regexpString.multiline ? "m" : "");
      regexpString = regexpString.source;
    }
    regexpString = regexpString.replace(/\\y\{(.*?)\}/g, function (match, group) {
      return kCactbotCategories[group] || match;
    });
    return new RegExp(regexpString, modifiers);
  }

  // Like Regex.parse, but force global flag.
  static parseGlobal(regexpString: RegExp) {
    const regex = Regexes.parse(regexpString);
    let modifiers = "gi";
    modifiers += (regexpString.multiline ? "m" : "");
    return new RegExp(regex.source, modifiers);
  }

  static trueIfUndefined(value: any) {
    if (typeof (value) === "undefined")
      return true;
    return !!value;
  }

  static validateParams(
    f: { [s: string]: string | boolean | undefined },
    funcName: string,
    params: string[],
  ) {
    if (f === null)
      return;
    if (typeof f !== "object")
      return;
    const keys = Object.keys(f);
    for (let k = 0; k < keys.length; ++k) {
      const key = keys[k];
      if (!params.includes(key)) {
        throw new Error(`${funcName}: invalid parameter '${key}'.  ` +
          `Valid params: ${JSON.stringify(params)}`);
      }
    }
  }
}


const parseHelper = (
  params: { [s: string]: string | boolean | undefined } | undefined,
  funcName: string,
  fields: { [s: string]: { field: string, value?: string }; }
) => {
  // Validate params's field names vs the ones in fields.
  if (typeof params === "undefined")
    params = {};
  const validFields: string[] = [];
  for (const value of Object.values(fields)) {
    if (typeof value !== "object")
      continue;
    validFields.push(value.field);
  }
  Regexes.validateParams(params, funcName, ["capture", ...validFields]);

  // Find the last key we care about, so we can shorten the regex if needed.
  const capture = Regexes.trueIfUndefined(params.capture);
  const fieldKeys = Object.keys(fields);
  let maxKey;
  if (capture) {
    maxKey = fieldKeys[fieldKeys.length - 1];
  } else {
    maxKey = 0;
    for (const key of fieldKeys) {
      const value = fields[key];
      if (typeof value !== "object")
        continue;
      const fieldName = fields[key].field;
      if (fieldName in params)
        maxKey = key;
    }
  }

  // Build the regex from the fields.
  let str = "^";
  let lastKey = -1;
  for (const k in fields) {
    const key = parseInt(k);
    // Fill in blanks.
    const missingFields = key - lastKey - 1;
    if (missingFields === 1)
      str += "\\y{NetField}";
    else if (missingFields > 1)
      str += "\\y{NetField}{" + missingFields + "}";
    lastKey = key;

    const value = fields[key];
    if (typeof value !== "object")
      throw new Error(`${funcName}: invalid value: ${JSON.stringify(value)}`);

    const fieldName = fields[key].field;
    const fieldValue = "value" in fields[key] ? fields[key].value?.toString() : matchDefault;

    if (fieldName)
      str += Regexes.maybeCapture(capture, fieldName, params[fieldName] as string, fieldValue) + separator;
    else
      str += fieldValue + separator;


    // Stop if we're not capturing and don't care about future fields.
    if (key >= maxKey)
      break;
  }
  return Regexes.parse(str);
};

class NetRegexes {
  // matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#15-networkability
  // matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#16-networkaoeability
  static ability(params: {
    capture?: boolean,
    timestamp?: string,
    sourceId?: string,
    source?: string,
    id?: string,
    ability?: string,
    targetId?: string,
    target?: string,
  }) {
    return parseHelper(params, "ability", {
      0: { field: "type", value: "2[12]" },
      1: { field: "timestamp" },
      2: { field: "sourceId" },
      3: { field: "source" },
      4: { field: "id" },
      5: { field: "ability" },
      6: { field: "targetId" },
      7: { field: "target" },
    });
  }

  // matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#15-networkability
  // matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#16-networkaoeability
  static abilityFull(params: {
    capture?: boolean,
    timestamp?: string,
    sourceId?: string,
    source?: string,
    id?: string,
    ability?: string,
    targetId?: string,
    target?: string,
    flags?: string,
    damage?: string,
    targetCurrentHp?: string,
    targetMaxHp?: string,
    x?: string,
    y?: string,
    z?: string,
    heading?: string,
  }) {
    return parseHelper(params, "abilityFull", {
      0: { field: "type", value: "2[12]" },
      1: { field: "timestamp" },
      2: { field: "sourceId" },
      3: { field: "source" },
      4: { field: "id" },
      5: { field: "ability" },
      6: { field: "targetId" },
      7: { field: "target" },
      8: { field: "flags" },
      9: { field: "damage" },
      24: { field: "targetCurrentHp" },
      25: { field: "targetMaxHp" },
      40: { field: "x" },
      41: { field: "y" },
      42: { field: "z" },
      43: { field: "heading" },
    });
  }
}

export {
  Regexes,
  NetRegexes,
};