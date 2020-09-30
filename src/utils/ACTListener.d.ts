interface Party {
  id: string;
  name: string;
  worldId: number;
  job: number;
  inParty: boolean;
}

interface Events {
  "CombatData": () => void;
  "LogLine": (ev: { line: string[], rawLine: string }) => void;
  "ChangeZone": (ev: { zoneID: string }) => void;
  "ChangePrimaryPlayer": (ev: { charID: string, charName: string }) => void;
  "OnlineStatusChanged": (ev: { target: string, rawStatus: number, status: string }) => void;
  "PartyChanged": (ev: { party: Party[] }) => void;
}

declare function addOverlayListener<E extends keyof Events>(
  event: E, listener: Events[E]
): void;

export {
  addOverlayListener,
  Party,
};
