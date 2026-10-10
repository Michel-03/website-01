"use client";

import { useEffect, useState } from "react";
import type { LiveStatus } from "@/lib/useLiveData";

const labels: Record<LiveStatus, string> = {
  connecting: "Connecting",
  live: "Live",
  polling: "Auto-refreshing",
  offline: "Not connected",
};

const colors: Record<LiveStatus, string> = {
  connecting: "bg-amber-400",
  live: "bg-emerald-500",
  polling: "bg-sky-500",
  offline: "bg-red-500",
};

export default function LiveIndicator({
  status,
  lastUpdated,
  onRefresh,
  tone = "light",
}: {
  status: LiveStatus;
  lastUpdated: Date | null;
  onRefresh?: () => void;
  tone?: "light" | "dark";
}) {
  const [, setNow] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setNow((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const seconds = lastUpdated
    ? Math.max(0, Math.round((Date.now() - lastUpdated.getTime()) / 1000))
    : null;
  const text = tone === "dark" ? "text-white/70" : "text-gray-500";

  return (
    <div className={`inline-flex items-center gap-2 text-xs ${text}`}>
      <span className="relative flex h-2 w-2">
        {status === "live" && (
          <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${colors[status]} opacity-60`} />
        )}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${colors[status]}`} />
      </span>
      <span className="font-medium">{labels[status]}</span>
      {seconds !== null && <span>· updated {seconds}s ago</span>}
      {onRefresh && (
        <button onClick={onRefresh} className="font-semibold text-[#605BAD] hover:underline">
          Refresh
        </button>
      )}
    </div>
  );
}
