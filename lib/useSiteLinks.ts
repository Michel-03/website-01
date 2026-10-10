"use client";

import { defaultSiteLinks, type SiteLink } from "./siteLinks";
import { useLiveData } from "./useLiveData";

export function useSiteLinks() {
  const live = useLiveData<{ links: SiteLink[]; source: string }>("/api/links", {
    intervalMs: 30000,
    realtimeTables: ["site_links"],
    select: (payload) =>
      payload.success ? { links: payload.links ?? [], source: payload.source ?? "fallback" } : null,
  });

  return {
    ...live,
    links: live.data?.links?.length ? live.data.links : defaultSiteLinks,
    source: live.data?.source ?? "fallback",
  };
}
