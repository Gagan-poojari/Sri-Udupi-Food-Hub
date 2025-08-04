const fs = require("fs");
const axios = require("axios");
const delay = ms => new Promise(res => setTimeout(res, ms));

const API_KEY = "TG508VwhcIW1shF7UzWafEZoW77vXl1kXsPf97632NgFtocIwnZetVUG"; // replace with your real key
const DELAY_MS = 18000; // 18 seconds per request = 200/hour
const MAX_REQUESTS = 1200; // 6 hours * 200
const INPUT_PATH = "./data/sufh_menu.json";
const OUTPUT_PATH = "./data/sufh_menu_with_images03.json";

// Load menu
let menu = JSON.parse(fs.readFileSync(INPUT_PATH, "utf-8"));
let requestCount = 0;

const fetchImage = async query => {
  try {
    const response = await axios.get("https://api.pexels.com/v1/search", {
      headers: { Authorization: API_KEY },
      params: { query, per_page: 1 }
    });
    const photos = response.data.photos;
    return photos.length ? photos[0].src.medium : null;
  } catch (error) {
    if (error.response?.status === 429) {
      console.warn("⚠️ Rate limit hit. Waiting 1 hour...");
      await delay(3600000); // 1 hour wait
      return fetchImage(query); // retry
    }
    console.error(`❌ Failed for "${query}":`, error.message);
    return null;
  }
};

const run = async () => {
  for (const category of menu) {
    for (const item of category.items) {
      if (requestCount >= MAX_REQUESTS) {
        console.log(`✅ Reached max of ${MAX_REQUESTS} requests. Exiting.`);
        fs.writeFileSync(OUTPUT_PATH, JSON.stringify(menu, null, 2));
        return;
      }

      if (!item.image) {
        const imageUrl = await fetchImage(item.name);
        item.image = imageUrl || "https://via.placeholder.com/150?text=No+Image";
        requestCount++;
        console.log(`🔍 [${requestCount}/${MAX_REQUESTS}] Got image for: ${item.name}`);
        await delay(DELAY_MS); // space out requests
      }
    }
  }

  console.log("🎉 Completed fetching all images.");
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(menu, null, 2));
};

run();
