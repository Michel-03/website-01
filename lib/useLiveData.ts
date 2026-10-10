"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getBrowserSupabase } from "./supabaseBrowser";

type Options<T> = {
  intervalMs?: number;
  realtimeTables?: string[];
  select: (payload: any) => T | null;
};

export type LiveStatus = "connecting" | "live" | "polling" | "offline";

export function useLiveData<T>(url: string, options: Options<T>) {
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
    const channel =
      supabase && tables.length
        ? tables
            .reduce(
              (current, table) =>
                current.on(
                  "postgres_changes",
                  { event: "*", schema: "public", table },
                  () => refresh()
                ),
              supabase.channel(`live:${url}:${tablesKey}`)
            )
            .subscribe((state) => {
              if (state === "SUBSCRIBED") setStatus("live");
            })
        : null;

    return () => {
      window.clearInterval(timer);
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", tick);
      if (supabase && channel) supabase.removeChannel(channel);
    };
  }, [refresh, intervalMs, tablesKey, url]);

  return { data, error, loading, lastUpdated, status, refresh };
}
