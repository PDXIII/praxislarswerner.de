// lib/cached.ts
const cache = new Map<string, any>();

export async function cached<T>(key: string, fn: () => Promise<T>): Promise<T> {
  if (cache.has(key)) return cache.get(key);
  const result = await fn();
  cache.set(key, result);
  return result;
}
