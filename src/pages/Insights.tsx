import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getStoredEvents, clearStoredEvents } from "@/lib/analytics/store";

const groupCounts = (items: Array<{ key: string }>) => {
  const counts = new Map<string, number>();
  items.forEach((item) => {
    counts.set(item.key, (counts.get(item.key) ?? 0) + 1);
  });
  return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
};

export const Insights = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const events = useMemo(() => getStoredEvents(), [refreshKey]);

  const promptViews = useMemo(
    () =>
      groupCounts(
        events
          .filter((event) => event.name === "prompt_view")
          .map((event) => ({
            key: String(event.payload?.slug ?? "unknown"),
          }))
      ),
    [events]
  );

  const promptCopies = useMemo(
    () =>
      groupCounts(
        events
          .filter((event) => event.name === "prompt_copy")
          .map((event) => ({
            key: String(event.payload?.slug ?? "unknown"),
          }))
      ),
    [events]
  );

  const searches = useMemo(
    () =>
      groupCounts(
        events
          .filter((event) => event.name === "prompt_search")
          .map((event) => ({
            key: String(event.payload?.query ?? "").toLowerCase(),
          }))
      ).filter(([query]) => query),
    [events]
  );

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-16">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Prompt insights</h1>
          <Button
            variant="outline"
            onClick={() => {
              clearStoredEvents();
              setRefreshKey((prev) => prev + 1);
            }}
          >
            Clear local data
          </Button>
        </div>
        <p className="text-muted-foreground">
          Local usage signals captured from prompt interactions. Connect GA4 or
          another analytics provider later.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border/70 shadow-card-soft">
          <CardHeader>
            <CardTitle>Most viewed prompts</CardTitle>
            <CardDescription>Top prompts by views.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {promptViews.length ? (
              promptViews.slice(0, 6).map(([slug, count]) => (
                <div key={slug} className="flex items-center justify-between">
                  <span className="text-sm">{slug}</span>
                  <Badge variant="secondary">{count}</Badge>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No prompt views recorded yet.
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/70 shadow-card-soft">
          <CardHeader>
            <CardTitle>Most copied prompts</CardTitle>
            <CardDescription>Top prompts by copy action.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {promptCopies.length ? (
              promptCopies.slice(0, 6).map(([slug, count]) => (
                <div key={slug} className="flex items-center justify-between">
                  <span className="text-sm">{slug}</span>
                  <Badge variant="secondary">{count}</Badge>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No prompt copies recorded yet.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/70 shadow-card-soft">
        <CardHeader>
          <CardTitle>Top search queries</CardTitle>
          <CardDescription>What visitors are searching for.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {searches.length ? (
            searches.slice(0, 10).map(([query, count], index) => (
              <div key={`${query}-${index}`} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">{query}</span>
                  <Badge variant="secondary">{count}</Badge>
                </div>
                {index < searches.length - 1 ? <Separator /> : null}
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              No search activity recorded yet.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
