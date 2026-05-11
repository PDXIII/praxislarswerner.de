import { describe, it, expect } from "vitest";

// Extracted helper — same logic as in index.astro and [...slug].astro
function toAbsoluteUrl(url: string): string {
  return url.startsWith("//") ? `https:${url}` : url;
}

describe("toAbsoluteUrl", () => {
  it("ergänzt https: bei protocol-relative URLs", () => {
    expect(toAbsoluteUrl("//images.ctfassets.net/photo.jpg")).toBe(
      "https://images.ctfassets.net/photo.jpg"
    );
  });

  it("lässt https-URLs unverändert", () => {
    expect(toAbsoluteUrl("https://images.ctfassets.net/photo.jpg")).toBe(
      "https://images.ctfassets.net/photo.jpg"
    );
  });

  it("lässt leere Strings unverändert", () => {
    expect(toAbsoluteUrl("")).toBe("");
  });

  it("lässt relative Pfade unverändert", () => {
    expect(toAbsoluteUrl("/images/photo.jpg")).toBe("/images/photo.jpg");
  });
});
