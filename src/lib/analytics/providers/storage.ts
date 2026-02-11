import type { AnalyticsEvent, AnalyticsProvider } from "../analytics";
import { recordEvent } from "../store";

export const storageProvider: AnalyticsProvider = {
  track: (event: AnalyticsEvent) => {
    recordEvent({
      name: event.name,
      payload: event.payload,
      timestamp: new Date().toISOString(),
    });
  },
};
