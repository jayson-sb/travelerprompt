export type StoredEvent = {
  name: string;
  payload?: Record<string, unknown>;
  timestamp: string;
};

const STORAGE_KEY = "prompt_events";

export const recordEvent = (event: StoredEvent) => {
  if (typeof window === "undefined") return;

  const existing = getStoredEvents();
  existing.push(event);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
};

export const getStoredEvents = (): StoredEvent[] => {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as StoredEvent[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const clearStoredEvents = () => {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
};
