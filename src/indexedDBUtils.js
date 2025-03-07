import { openDB } from "idb";

const dbPromise = openDB("offline-db", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("apiData")) {
      db.createObjectStore("apiData");
      console.log("🟢 IndexedDB store 'apiData' created.");
    }
  },
});

// Save API data
export const saveData = async (key, data) => {
  const db = await dbPromise;
  await db.put("apiData", data, key);
  console.log(✅ Saved data to IndexedDB: ${key}, data);
};

// Get API data
export const getData = async (key) => {
  const db = await dbPromise;
  const result = await db.get("apiData", key);
  console.log(🔍 Retrieved data from IndexedDB: ${key}, result);
  return result;
};

// ✅ Expose functions globally for testing in DevTools
window.saveData = saveData;
window.getData = getData;