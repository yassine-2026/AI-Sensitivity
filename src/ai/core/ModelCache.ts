import { env } from '@huggingface/transformers';

export class ModelCache {
  static configure() {
    // Ensure the library uses browser cache (Cache API / IndexedDB)
    env.allowLocalModels = false;
    env.useBrowserCache = true;
    env.useFSCache = false;
    env.useCustomCache = false;
  }
  
  static async clearCache() {
    try {
      const cacheKeys = await caches.keys();
      for (const key of cacheKeys) {
        if (key.includes('transformers')) {
          await caches.delete(key);
        }
      }
    } catch(e) {
      console.error('Failed to clear model cache:', e);
    }
  }
}
