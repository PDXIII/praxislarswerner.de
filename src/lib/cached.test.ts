import { describe, it, expect, beforeEach } from "vitest";

// Re-import fresh module each test to reset the module-level cache
let cached: <T>(key: string, fn: () => Promise<T>) => Promise<T>;

beforeEach(async () => {
  // Clear module cache between tests so the Map starts empty
  const mod = await import("./cached?t=" + Date.now());
  cached = mod.cached;
});

describe("cached", () => {
  it("ruft die Funktion beim ersten Aufruf auf", async () => {
    let calls = 0;
    const fn = async () => {
      calls++;
      return "result";
    };

    const result = await cached("key1", fn);
    expect(result).toBe("result");
    expect(calls).toBe(1);
  });

  it("gibt gecachtes Ergebnis zurück ohne die Funktion erneut aufzurufen", async () => {
    let calls = 0;
    const fn = async () => {
      calls++;
      return "result";
    };

    await cached("key2", fn);
    const result = await cached("key2", fn);

    expect(result).toBe("result");
    expect(calls).toBe(1);
  });

  it("unterscheidet zwischen verschiedenen Keys", async () => {
    const fn1 = async () => "value1";
    const fn2 = async () => "value2";

    const r1 = await cached("keyA", fn1);
    const r2 = await cached("keyB", fn2);

    expect(r1).toBe("value1");
    expect(r2).toBe("value2");
  });
});
