import type { AnalyticsEvent, AnalyticsProvider } from "../analytics";

export const consoleProvider: AnalyticsProvider = {
  track: (event: AnalyticsEvent) => {
    if (import.meta.env.DEV) {
      console.info("[analytics]", event.name, event.payload ?? {});
    }
  },
};
