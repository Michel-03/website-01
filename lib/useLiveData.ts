"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { getBrowserSupabase } from "./supabaseBrowser";

type Options<T> = {
  intervalMs?: number;
  realtimeTables?: string[];
  select: (payload: any) => T | null;
};

export type LiveStatus = "connecting" | "live" | "polling" | "offline";

export function useLiveData<T>(url: string, options: Options<T>) {
  const reactId = useId();
  const { intervalMs = 8000, realtimeTables = [], select } = options;
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [status, setStatus] = useState<LiveStatus>("connecting");
  const selectRef = useRef(select);
  useEffect(() => {
    selectRef.current = select;
  }, [select]);
  const tablesKey = realtimeTables.join(",");

  const refresh = useCallback(async () => {
    try {
      const response = await fetch(url, { cache: "no-store" });
      const payload = await response.json();
      const value = selectRef.current(payload);

      if (!response.ok || value === null) {
        setError(payload.error || payload.message || "Data could not be loaded.");
        setStatus("offline");
        return;
      }

      setData(value);
      setError("");
      setLastUpdated(new Date());
      setStatus((current) => (current === "live" ? "live" : "polling"));
    } catch {
      setError("The data service did not respond.");
      setStatus("offline");
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    refresh();

    const tick = () => {
      if (document.visibilityState === "visible") refresh();
    };
    const timer = window.setInterval(tick, intervalMs);
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", tick);

    const supabase = getBrowserSupabase();
    const tables = tablesKey ? tablesKey.split(",") : [];
    let channel: ReturnType<NonNullable<typeof supabase>["channel"]> | null = null;
    if (supabase && tables.length) {
      try {
        // Each component needs its own channel. Supabase reuses a channel by name,
        // and adding another listener after subscribe() crashes the page.
        let next = supabase.channel(`live:${reactId}:${url}:${tablesKey}`);
        for (const table of tables) {
          next = next.on(
            "postgres_changes",
            { event: "*", schema: "public", table },
            () => refresh()
          );
        }
        channel = next.subscribe((state) => {
          if (state === "SUBSCRIBED") setStatus("live");
        });
      } catch (error) {
        console.error(
          "Live updates unavailable:",
          error instanceof Error ? error.message : error
        );
      }
    }

    return () => {
      window.clearInterval(timer);
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", tick);
      if (supabase && channel) supabase.removeChannel(channel);
    };
  }, [reactId, refresh, intervalMs, tablesKey, url]);

  return { data, error, loading, lastUpdated, status, refresh };
}
