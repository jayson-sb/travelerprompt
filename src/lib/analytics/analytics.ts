import { consoleProvider } from "./providers/console";
import { storageProvider } from "./providers/storage";

export type AnalyticsEventName =
  | "prompt_list_view"
  | "prompt_view"
  | "prompt_copy"
  | "prompt_search"
  | "prompt_filter_change"
  | "outbound_click";

export type AnalyticsEvent = {
  name: AnalyticsEventName;
  payload?: Record<string, unknown>;
};

export type AnalyticsProvider = {
  track: (event: AnalyticsEvent) => void;
};

let providers: AnalyticsProvider[] = [consoleProvider, storageProvider];

export const setAnalyticsProviders = (next: AnalyticsProvider[]) => {
  providers = next;
};

export const trackEvent = (event: AnalyticsEvent) => {
  providers.forEach((provider) => provider.track(event));
};
