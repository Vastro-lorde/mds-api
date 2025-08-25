// Simple in-memory cache with TTL and prefix invalidation
// Decoupled utility: no service or domain specifics here

class MemoryCache {
  constructor() {
    this.store = new Map(); // key -> { value, exp }
    this.prefixIndex = new Map(); // prefix -> Set(keys)
    this.cleanupInterval = setInterval(() => this.cleanup(), 60 * 1000).unref?.();
  }

  static stableKey(parts) {
    // Build a stable string key from array/object parts
    return parts
      .map((p) => (typeof p === 'string' ? p : JSON.stringify(p)))
      .join(':');
  }

  set(key, value, ttlMs, { prefix } = {}) {
    const exp = ttlMs ? Date.now() + ttlMs : undefined;
    this.store.set(key, { value, exp });
    if (prefix) {
      if (!this.prefixIndex.has(prefix)) this.prefixIndex.set(prefix, new Set());
      this.prefixIndex.get(prefix).add(key);
    }
  }

  get(key) {
    const entry = this.store.get(key);
    if (!entry) return undefined;
    if (entry.exp && entry.exp < Date.now()) {
      this.store.delete(key);
      return undefined;
    }
    return entry.value;
  }

  del(key) {
    this.store.delete(key);
    // also remove from any prefix sets
    for (const set of this.prefixIndex.values()) set.delete(key);
  }

  invalidatePrefix(prefix) {
    const keys = this.prefixIndex.get(prefix);
    if (!keys) return;
    for (const key of keys) this.store.delete(key);
    this.prefixIndex.delete(prefix);
  }

  cleanup() {
    const now = Date.now();
    for (const [key, entry] of this.store.entries()) {
      if (entry.exp && entry.exp < now) this.store.delete(key);
    }
  }
}

// Singleton instance for app-wide cache
const cache = new MemoryCache();

module.exports = {
  cache,
  MemoryCache,
};
