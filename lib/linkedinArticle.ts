const BROWSER =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

const MONTHS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
];

export type LinkedInArticle = {
  sourceUrl: string;
  title: string;
  author: string;
  publishedAt: string;
  publishedLabel: string;
  excerpt: string;
  coverImage: string;
  content: string;
  readTime: string;
  partial: boolean;
};

function isLinkedInHost(hostname: string) {
  const host = hostname.toLowerCase().replace(/^www\./, "");
  return host === "linkedin.com" || host.endsWith(".linkedin.com") || host === "lnkd.in";
}

export function assertLinkedInArticleUrl(value: string) {
  let url: URL;
  try {
    url = new URL(value.trim());
  } catch {
    throw new Error("Enter a full LinkedIn article link, starting with https://.");
  }
  if (url.protocol !== "https:" || !isLinkedInHost(url.hostname)) {
    throw new Error("That link is not a LinkedIn article. Use a https://www.linkedin.com/pulse/… address.");
  }
  return url.toString();
}

function decode(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
}

function meta(html: string, property: string) {
  const pattern = new RegExp(
    `<meta[^>]+(?:property|name)=["']${property}["'][^>]+content=["']([^"']*)["']|<meta[^>]+content=["']([^"']*)["'][^>]+(?:property|name)=["']${property}["']`,
    "i"
  );
  const match = html.match(pattern);
  return decode(match?.[1] || match?.[2] || "").trim();
}

function plain(fragment: string) {
  return decode(fragment.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}

function htmlToMarkdown(fragment: string) {
  let text = fragment.replace(/<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/gi, (_, inner: string) => `\n\n## ${plain(inner)}\n\n`);
  text = text.replace(/<br\s*\/?>/gi, "\n");
  text = text.replace(/<li[^>]*>/gi, "\n- ");
  text = text.replace(/<\/li>/gi, "");
  text = text.replace(/<a [^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href: string, label: string) => {
    const name = plain(label);
    if (!name) return "";
    const clean = decode(href).split("?")[0];
    return `[${name}](${clean})`;
  });
  text = text.replace(/<\/p>/gi, "\n\n");
  text = decode(text.replace(/<[^>]+>/g, ""));
  return text.replace(/[ \t]+\n/g, "\n").replace(/[ \t]{2,}/g, " ").replace(/\n{3,}/g, "\n\n").trim();
}

function articleRegion(html: string) {
  const start = html.search(/class="[^"]*article-main/);
  if (start < 0) return "";
  const end = html.indexOf("article-social-activity", start);
  return html.slice(start, end > start ? end : start + 200_000);
}

function jsonLdDate(html: string) {
  const match = html.match(/"datePublished":"([^"]+)"/);
  if (!match) return "";
  const date = new Date(match[1]);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
}

function absoluteDate(text: string) {
  const match = text.match(
    /\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2}),\s+(\d{4})\b/i
  );
  if (!match) return "";
  const month = MONTHS.indexOf(match[1].toLowerCase());
  const date = new Date(Date.UTC(Number(match[3]), month, Number(match[2])));
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
}

function relativeDate(label: string) {
  const match = label.match(/(\d+)\s+(year|month|week|day)/i);
  if (!match) return "";
  const amount = Number(match[1]);
  const date = new Date();
  const unit = match[2].toLowerCase();
  if (unit.startsWith("year")) date.setFullYear(date.getFullYear() - amount);
  else if (unit.startsWith("month")) date.setMonth(date.getMonth() - amount);
  else if (unit.startsWith("week")) date.setDate(date.getDate() - amount * 7);
  else date.setDate(date.getDate() - amount);
  return date.toISOString().slice(0, 10);
}

function readTime(markdown: string) {
  const words = markdown.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

function byline(description: string) {
  if (!/^By\s+/i.test(description)) return "";
  const stop = new Set(["the", "a", "an", "this", "in", "on", "our", "how", "why", "what", "when"]);
  const name: string[] = [];
  for (const word of description.replace(/^By\s+/i, "").split(/\s+/)) {
    const clean = word.replace(/[.,]$/, "");
    if (!/^[A-Z]/.test(clean) || stop.has(clean.toLowerCase()) || name.length === 4) break;
    name.push(clean);
  }
  return name.join(" ");
}

function excerptFrom(markdown: string) {
  const paragraph = markdown
    .split(/\n{2,}/)
    .map((part) => part.replace(/^#+\s+/, "").replace(/!\[[^\]]*]\([^)]+\)/g, "").trim())
    .find((part) => part && !part.startsWith("- ") && part.length > 40);
  const text = (paragraph || markdown).replace(/\s+/g, " ").trim();
  return text.length > 220 ? `${text.slice(0, 217).trim()}…` : text;
}

function markdownFrom(region: string) {
  const blocks: string[] = [];
  const pattern =
    /<h2\b[^>]*data-test-id="pulse-publishing-h1"[^>]*>([\s\S]*?)<\/h2>|<div\b[^>]*data-test-id="publishing-text-block"[^>]*>([\s\S]*?)<\/div>|<figure\b[^>]*>([\s\S]*?)<\/figure>/gi;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(region))) {
    if (match[1]) {
      const heading = plain(match[1]);
      if (heading) blocks.push(`## ${heading}`);
    } else if (match[2]) {
      const paragraph = htmlToMarkdown(match[2]);
      if (paragraph) blocks.push(paragraph);
    } else if (match[3]) {
      const figure = match[3];
      const source = figure.match(/data-delayed-url="([^"]+)"/) || figure.match(/\ssrc="(https:[^"]+)"/);
      if (!source) continue;
      const alt = plain(figure.match(/\salt="([^"]*)"/)?.[1] || "");
      const caption = plain(figure.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/)?.[1] || "");
      blocks.push(`![${alt}](${decode(source[1])})`);
      if (caption && caption !== alt) blocks.push(`*${caption}*`);
    }
  }
  return blocks.join("\n\n").trim();
}

async function fetchArticle(start: string) {
  let current = start;
  for (let hop = 0; hop < 5; hop += 1) {
    const response = await fetch(current, {
      redirect: "manual",
      headers: { "User-Agent": BROWSER, Accept: "text/html", "Accept-Language": "en-US,en;q=0.9" },
    });
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      if (!location) throw new Error("LinkedIn redirected without a destination.");
      const next = new URL(location, current);
      if (!isLinkedInHost(next.hostname)) throw new Error("That link left LinkedIn before the article loaded.");
      current = next.toString();
      continue;
    }
    if (!response.ok) throw new Error(`LinkedIn returned ${response.status} for that article.`);
    const html = await response.text();
    if (html.length > 2_500_000) throw new Error("That page was too large to import.");
    return { finalUrl: current, html };
  }
  throw new Error("LinkedIn redirected too many times.");
}

export function parseLinkedInArticle(html: string, finalUrl: string): LinkedInArticle {
  const final = new URL(finalUrl);
  if (!final.pathname.includes("/pulse/")) {
    throw new Error(
      "LinkedIn did not return an article. Paste the public article link (linkedin.com/pulse/…). Posts that require a login cannot be imported."
    );
  }
  if (/authwall|uas-consumer-login/i.test(html.slice(0, 5000))) {
    throw new Error("LinkedIn asked for a login, so the article text is not available.");
  }

  const title = plain(html.match(/class="[^"]*pulse-title[^"]*"[^>]*>([\s\S]*?)<\/h1>/)?.[1] || "") || meta(html, "og:title");
  if (!title || /top content on linkedin/i.test(title)) {
    throw new Error("LinkedIn could not find that article. Check the link and try again.");
  }

  const region = articleRegion(html);
  const content = markdownFrom(region);
  const description = meta(html, "og:description");
  const partial = content.length < 80;
  const body = partial ? description : content;
  if (!body) throw new Error("The page loaded, but LinkedIn did not include the article text.");

  const author = byline(description) || meta(html, "twitter:data1") || "LinkedIn";
  const publishedLabel = plain(html.match(/inline-article-published-date[^>]*>([\s\S]{0,400}?)<\/span>/)?.[1] || "");
  const publishedAt = jsonLdDate(html) || absoluteDate(`${description}\n${body}`) || relativeDate(publishedLabel) || new Date().toISOString().slice(0, 10);

  return {
    sourceUrl: finalUrl.split("?")[0],
    title,
    author,
    publishedAt,
    publishedLabel,
    excerpt: excerptFrom(body),
    coverImage: meta(html, "og:image"),
    content: body,
    readTime: readTime(body),
    partial,
  };
}

export async function fetchLinkedInArticle(input: string): Promise<LinkedInArticle> {
  const requested = assertLinkedInArticleUrl(input);
  const { finalUrl, html } = await fetchArticle(requested);
  return parseLinkedInArticle(html, finalUrl);
}
