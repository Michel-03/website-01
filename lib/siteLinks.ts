export type SiteLink = {
  id?: number | string;
  label: string;
  href: string;
  group_name: string;
  sort_order: number;
  is_active?: boolean;
};

export const defaultSiteLinks: SiteLink[] = [
  { label: "About", href: "/about", group_name: "Company", sort_order: 10, is_active: true },
  { label: "How we work", href: "/how-we-work", group_name: "Company", sort_order: 15, is_active: true },
  { label: "Careers", href: "/careers", group_name: "Company", sort_order: 20, is_active: true },
  { label: "Life at Byte Analytics", href: "/life-at-byte", group_name: "Company", sort_order: 25, is_active: true },
  { label: "Case studies", href: "/case-studies", group_name: "Company", sort_order: 30, is_active: true },
  { label: "Blog", href: "/blog", group_name: "Company", sort_order: 40, is_active: true },
  { label: "Podcast", href: "/podcast", group_name: "Company", sort_order: 50, is_active: true },
  { label: "FAQs", href: "/FAQ", group_name: "Company", sort_order: 60, is_active: true },
  { label: "Contact", href: "/contact", group_name: "Company", sort_order: 70, is_active: true },
  { label: "Products", href: "/products", group_name: "Company", sort_order: 80, is_active: true },
  { label: "Privacy", href: "/privacy", group_name: "Company", sort_order: 90, is_active: true },
  { label: "All services", href: "/services", group_name: "Services", sort_order: 5, is_active: true },
  { label: "AI Strategy", href: "/ai-strategy", group_name: "Services", sort_order: 10, is_active: true },
  { label: "PoC Factory", href: "/poc-factory", group_name: "Services", sort_order: 20, is_active: true },
  { label: "Consultancy", href: "/Consultancy", group_name: "Services", sort_order: 30, is_active: true },
  { label: "Custom GPT", href: "/custom-gpt", group_name: "Services", sort_order: 40, is_active: true },
  { label: "GenAI for Business", href: "/genai-for-business", group_name: "Services", sort_order: 50, is_active: true },
  { label: "Agnostic AI", href: "/agnostic-ai", group_name: "Services", sort_order: 60, is_active: true },
  { label: "Automation", href: "/automation", group_name: "Services", sort_order: 70, is_active: true },
  { label: "Data Governance", href: "/data-governance", group_name: "Services", sort_order: 80, is_active: true },
  { label: "Healthcare", href: "/ai-in-healthcare", group_name: "Industries", sort_order: 10, is_active: true },
  { label: "Finance", href: "/ai-in-finance", group_name: "Industries", sort_order: 20, is_active: true },
  { label: "Retail", href: "/ai-in-retail", group_name: "Industries", sort_order: 30, is_active: true },
  { label: "Construction", href: "/ai-in-construction", group_name: "Industries", sort_order: 40, is_active: true },
  { label: "Real estate", href: "/ai-in-real-estate", group_name: "Industries", sort_order: 50, is_active: true },
  { label: "Natural resources", href: "/ai-in-natural-resources", group_name: "Industries", sort_order: 60, is_active: true },
  { label: "Marketing", href: "/ai-in-marketing", group_name: "Industries", sort_order: 70, is_active: true },
];

export function groupLinks(links: SiteLink[]) {
  const groups = new Map<string, SiteLink[]>();

  for (const link of links) {
    if (link.is_active === false) continue;
    const name = link.group_name || "Company";
    const current = groups.get(name) ?? [];
    current.push(link);
    groups.set(name, current);
  }

  return Array.from(groups.entries()).map(([name, items]) => ({
    name,
    items: items.sort((a, b) => a.sort_order - b.sort_order),
  }));
}
