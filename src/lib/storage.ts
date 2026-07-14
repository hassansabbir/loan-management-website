/**
 * Storage service for browser storage (localStorage, sessionStorage)
 * Provides a consistent API with error handling and serialization
 */

// Storage types
type StorageType = "local" | "session";

// Get storage object based on type
function getStorage(type: StorageType): Storage {
  if (typeof window === "undefined") {
    // Server-side rendering fallback
    return {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
      clear: () => {},
      key: () => null,
      length: 0,
    };
  }

  return type === "local" ? window.localStorage : window.sessionStorage;
}

/**
 * Set an item in storage
 * @param key - Storage key
 * @param value - Value to store (will be JSON stringified)
 * @param type - Storage type (default: 'local')
 * @returns Boolean indicating success
 */
export function setItem(
  key: string,
  value: any,
  type: StorageType = "local"
): boolean {
  try {
    const storage = getStorage(type);
    const serialized = JSON.stringify(value);
    storage.setItem(key, serialized);
    return true;
  } catch (error) {
    console.error(`Error setting ${type} storage item:`, error);
    return false;
  }
}

/**
 * Get an item from storage
 * @param key - Storage key
 * @param defaultValue - Default value if key doesn't exist
 * @param type - Storage type (default: 'local')
 * @returns Parsed value or defaultValue
 */
export function getItem<T>(
  key: string,
  defaultValue: T | null = null,
  type: StorageType = "local"
): T | null {
  try {
    const storage = getStorage(type);
    const value = storage.getItem(key);

    if (value === null) {
      return defaultValue;
    }

    return JSON.parse(value) as T;
  } catch (error) {
    console.error(`Error getting ${type} storage item:`, error);
    return defaultValue;
  }
}

/**
 * Remove an item from storage
 * @param key - Storage key
 * @param type - Storage type (default: 'local')
 * @returns Boolean indicating success
 */
export function removeItem(key: string, type: StorageType = "local"): boolean {
  try {
    const storage = getStorage(type);
    storage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing ${type} storage item:`, error);
    return false;
  }
}

/**
 * Clear all items from storage
 * @param type - Storage type (default: 'local')
 * @returns Boolean indicating success
 */
export function clearStorage(type: StorageType = "local"): boolean {
  try {
    const storage = getStorage(type);
    storage.clear();
    return true;
  } catch (error) {
    console.error(`Error clearing ${type} storage:`, error);
    return false;
  }
}

/**
 * Check if storage is available
 * @param type - Storage type (default: 'local')
 * @returns Boolean indicating if storage is available
 */
export function isStorageAvailable(type: StorageType = "local"): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const storage = getStorage(type);
    const testKey = "__storage_test__";

    storage.setItem(testKey, "test");
    storage.removeItem(testKey);

    return true;
  } catch (error) {
    console.error(`Error checking ${type} storage availability:`, error);
    return false;
  }
}

// Export default storage object with all methods
const storage = {
  setItem,
  getItem,
  removeItem,
  clear: clearStorage,
  isAvailable: isStorageAvailable,
  local: {
    set: (key: string, value: any) => setItem(key, value, "local"),
    get: <T>(key: string, defaultValue?: T | null) =>
      getItem<T>(key, defaultValue, "local"),
    remove: (key: string) => removeItem(key, "local"),
    clear: () => clearStorage("local"),
  },
  session: {
    set: (key: string, value: any) => setItem(key, value, "session"),
    get: <T>(key: string, defaultValue?: T | null) =>
      getItem<T>(key, defaultValue, "session"),
    remove: (key: string) => removeItem(key, "session"),
    clear: () => clearStorage("session"),
  },
};

export default storage;
