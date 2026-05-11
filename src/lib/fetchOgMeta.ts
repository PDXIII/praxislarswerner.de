// src/lib/fetchOgMeta.ts

export interface OgMeta {
  description?: string;
  imageUrl?: string;
}

export async function fetchOgMeta(url: string): Promise<OgMeta> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; PraxisBot/1.0)" },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return {};

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
    return {};
  }
}

function extractMeta(html: string, names: string[]): string | null {
  for (const name of names) {
    const match =
      html.match(new RegExp(`<meta[^>]+property=["']${name}["'][^>]+content=["']([^"']+)["']`, 'i')) ||
      html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${name}["']`, 'i')) ||
      html.match(new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']+)["']`, 'i')) ||
      html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${name}["']`, 'i'));
    if (match?.[1]) return match[1];
  }
  return null;
}
