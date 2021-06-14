import { EventMap, EventType } from "./cactbot/types/event";

declare function addOverlayListener<E extends EventType>(
  event: E, listener: EventMap[E]
): void;

declare function startOverlayEvents(): void;

export {
  addOverlayListener,
  startOverlayEvents,
  Party,
};
