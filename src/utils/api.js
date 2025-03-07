import { saveData, getData } from '../indexedDBUtils';

export const fetchData = async () => {
  try {
    const response = await fetch('https://your-api.com/data');
    const data = await response.json();

    console.log("✅ API Data Fetched:", data);

    await saveData('cachedData', data)
      .then(() => console.log("✅ Data saved to IndexedDB"))
      .catch((error) => console.error("❌ Error saving to IndexedDB:", error));

    return data;
  } catch (error) {
    console.error("❌ API fetch failed:", error);
    
    const cachedData = await getData('cachedData');
    if (cachedData) {
      console.log("📤 Using cached API data:", cachedData);
    } else {
      console.log("❌ No cached API data available.");
    }
    
    return cachedData;
  }
};