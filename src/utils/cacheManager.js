import { mmkvStorage } from './storage';

/**
 * 🎯 Purpose: Centralized cache manager to reduce API calls
 * 
 * How it works:
 * 1. Before making API call, check if data exists in cache
 * 2. If cache exists and not expired, return cached data (no API call)
 * 3. If cache expired or missing, make API call and cache response
 * 
 * Performance Impact: Eliminates 200-500ms API calls for cached resources
 */

// ✅ In-memory cache for fast access (cleared on app restart)
const memoryCache = new Map();

/**
 * Get cached data from memory
 * @param {string} key - Unique cache key (e.g., 'home_banners')
 * @returns {object|null} - Cached data or null if expired/missing
 */
export const getFromMemoryCache = (key) => {
    const cached = memoryCache.get(key);

    if (!cached) {
        // console.log(`[CACHE MISS] ${key} - not in memory cache`);
        return null;
    }

    const now = Date.now();
    const isExpired = now > cached.expiresAt;

    if (isExpired) {
        // console.log(`[CACHE EXPIRED] ${key} - removing stale data`);
        memoryCache.delete(key);
        return null;
    }

    // console.log(`[CACHE HIT] ${key} - returning cached data (${Math.round((cached.expiresAt - now) / 1000)}s remaining)`);
    return cached.data;
};

/**
 * Save data to memory cache with TTL
 * @param {string} key - Unique cache key
 * @param {*} data - Data to cache
 * @param {number} ttlMinutes - Time to live in minutes
 */
export const saveToMemoryCache = (key, data, ttlMinutes) => {
    const expiresAt = Date.now() + (ttlMinutes * 60 * 1000);
    memoryCache.set(key, { data, expiresAt });
    // console.log(`[CACHE SAVED] ${key} - cached for ${ttlMinutes} minutes`);
};

/**
 * Clear specific cache entry (used when data is updated)
 * @param {string} key - Cache key to clear
 */
export const clearMemoryCache = (key) => {
    memoryCache.delete(key);
    // console.log(`[CACHE CLEARED] ${key}`);
};

/**
 * Clear all memory cache (used on logout)
 */
export const clearAllMemoryCache = () => {
    memoryCache.clear();
    // console.log('[CACHE CLEARED] All memory cache cleared');
};

// ===== Persistent Cache (using MMKV) =====

/**
 * Get cached data from MMKV (persistent cache)
 * @param {string} key - Unique cache key
 * @returns {object|null} - Cached data or null
 */
export const getFromAsyncCache = (key) => {
    try {
        const cached = mmkvStorage.getString(`cache_${key}`);

        if (!cached) {
            return null;
        }

        const { data, expiresAt } = JSON.parse(cached);
        const now = Date.now();

        if (now > expiresAt) {
            mmkvStorage.delete(`cache_${key}`);
            return null;
        }

        return data;
    } catch (error) {
        return null;
    }
};

/**
 * Save data to MMKV with TTL
 * @param {string} key - Unique cache key
 * @param {*} data - Data to cache
 * @param {number} ttlMinutes - Time to live in minutes
 */
export const saveToAsyncCache = (key, data, ttlMinutes) => {
    try {
        const expiresAt = Date.now() + (ttlMinutes * 60 * 1000);
        const cacheData = { data, expiresAt };
        mmkvStorage.set(`cache_${key}`, JSON.stringify(cacheData));
    } catch (error) {
    }
};

/**
 * Clear specific MMKV cache entry
 * @param {string} key - Cache key to clear
 */
export const clearAsyncCache = (key) => {
    try {
        mmkvStorage.delete(`cache_${key}`);
    } catch (error) {
    }
};

/**
 * Clear all MMKV cache (used on logout)
 */
export const clearAllAsyncCache = () => {
    try {
        const keys = mmkvStorage.getAllKeys();
        keys.forEach(key => {
            if (key.startsWith('cache_')) {
                mmkvStorage.delete(key);
            }
        });
    } catch (error) {
    }
};

// ===== Cache Strategy Configuration =====

/**
 * Cache configuration per resource type (as per performance report)
 */
export const CACHE_CONFIG = {
    HOME_BANNERS: { key: 'home_banners', ttl: 30, storage: 'memory' },
    PRODUCT_LISTS: { key: 'product_lists', ttl: 15, storage: 'memory' },
    BRAND_METADATA: { key: 'brand_metadata', ttl: 60, storage: 'async' },
    USER_PROFILE: { key: 'user_profile', ttl: 5, storage: 'memory' },
    ORDERS_LIST: { key: 'orders_list', ttl: 0.5, storage: 'memory' },
};
