// src/lib/fetchOgMeta.ts

export interface OgMeta {
  description?: string;
  imageUrl?: string;
}

export async function fetchOgMeta(url: string): Promise<OgMeta | null> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "de,en-US;q=0.7,en;q=0.3",
        "Accept-Encoding": "gzip, deflate, br",
        "Cache-Control": "no-cache",
      },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;

    const html = await res.text();

    const description = extractMeta(html, [
      'og:description',
      'twitter:description',
      'description',
    ]);

    const imageUrl = extractMeta(html, [
      'og:image',
      'twitter:image',
    ]);

    return { description: description ?? undefined, imageUrl: imageUrl ?? undefined };
  } catch {
    return null;
  }
}

function extractMeta(html: string, names: string[]): string | null {
  for (const name of names) {
    const match =
      html.match(new RegExp(`<meta[^>]+property=["']${name}["'][^>]+content=["']([^"']+)["']`, 'i')) ||
      html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${name}["']`, 'i')) ||
      html.match(new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']+)["']`, 'i')) ||
      html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${name}["']`, 'i'));
    if (match?.[1]) return decodeHtmlEntities(match[1]);
  }
  return null;
}

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}
