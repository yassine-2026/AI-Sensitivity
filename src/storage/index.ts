import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface AISensitivityDB extends DBSchema {
  settings: {
    key: string;
    value: any;
  };
  models: {
    key: string;
    value: ArrayBuffer;
  };
  cache: {
    key: string;
    value: any;
  };
}

let dbPromise: Promise<IDBPDatabase<AISensitivityDB>>;

if (typeof window !== 'undefined') {
  dbPromise = openDB<AISensitivityDB>('ai-sensitivity-db', 1, {
    upgrade(db) {
      db.createObjectStore('settings');
      db.createObjectStore('models');
      db.createObjectStore('cache');
    },
  });
}

export const SettingsStorage = {
  async get(key: string) {
    if (!dbPromise) return null;
    const db = await dbPromise;
    return db.get('settings', key);
  },
  async set(key: string, value: any) {
    if (!dbPromise) return;
    const db = await dbPromise;
    await db.put('settings', value, key);
  },
};

export const AIModelStorage = {
  async getModel(version: string) {
    if (!dbPromise) return null;
    const db = await dbPromise;
    return db.get('models', version);
  },
  async saveModel(version: string, buffer: ArrayBuffer) {
    if (!dbPromise) return;
    const db = await dbPromise;
    await db.put('models', buffer, version);
  },
};

export const CacheManager = {
  async get(key: string) {
    if (!dbPromise) return null;
    const db = await dbPromise;
    return db.get('cache', key);
  },
  async set(key: string, value: any) {
    if (!dbPromise) return;
    const db = await dbPromise;
    await db.put('cache', value, key);
  }
};
