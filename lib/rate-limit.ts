/**
 * Rate limiting in-memory, best effort.
 * Nota operativa: in ambienti serverless (Vercel) ogni istanza ha memoria
 * separata e il conteggio si azzera ad ogni cold start. Questa protezione
 * copre abusi elementari; per un controllo distribuito al go-live collegare
 * un provider esterno (es. Upstash Redis) mantenendo la stessa interfaccia.
 */

interface RateLimitOptions {
  key: string;
  limit: number;
  windowMs: number;
}

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

const store = new Map<string, number[]>();
const MAX_TRACKED_KEYS = 5_000;

export function rateLimit({
  key,
  limit,
  windowMs,
}: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  const windowStart = now - windowMs;

  if (store.size > MAX_TRACKED_KEYS) {
    for (const [storedKey, timestamps] of store) {
      if (timestamps.every((t) => t < windowStart)) store.delete(storedKey);
      if (store.size <= MAX_TRACKED_KEYS / 2) break;
    }
  }

  const timestamps = (store.get(key) ?? []).filter((t) => t >= windowStart);

  if (timestamps.length >= limit) {
    const oldest = timestamps[0];
    const retryAfterSeconds = Math.max(1, Math.ceil((oldest + windowMs - now) / 1000));
    store.set(key, timestamps);
    return { allowed: false, remaining: 0, retryAfterSeconds };
  }

  timestamps.push(now);
  store.set(key, timestamps);

  return {
    allowed: true,
    remaining: limit - timestamps.length,
    retryAfterSeconds: 0,
  };
}
