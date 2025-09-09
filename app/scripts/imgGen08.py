import json
import time
import requests

API_KEY = "TG508VwhcIW1shF7UzWafEZoW77vXl1kXsPf97632NgFtocIwnZetVUG"  # Your key
INPUT_PATH = "./sufh_menu.json"
OUTPUT_PATH = "./sufh_menu_with_images.json"
DELAY_SEC = 1.5  # Slight delay to avoid any accidental burst
MAX_RESULTS = 5

FOOD_KEYWORDS = ["food", "dish", "plate", "meal", "curry", "cuisine", "restaurant", "dessert", "drink"]

def build_search_query(item_name, category):
    """Make the search phrase more descriptive for better matches."""
    return f"{item_name} {category} Indian restaurant food dish"

def fetch_best_image(query):
    """Fetch most relevant image from Pexels."""
    headers = {"Authorization": API_KEY}
    params = {"query": query, "per_page": MAX_RESULTS}

    try:
        r = requests.get("https://api.pexels.com/v1/search", headers=headers, params=params)
        if r.status_code == 429:
            print("Rate limit hit — waiting 60s")
            time.sleep(60)
            return fetch_best_image(query)
        r.raise_for_status()
        photos = r.json().get("photos", [])
        if not photos:
            return None
        
        # Prioritize matches containing food-related words
        for p in photos:
            alt_text = p.get("alt", "").lower()
            if any(word in alt_text for word in FOOD_KEYWORDS):
                return p["src"]["medium"]
        
        # Else fallback to first image
        return photos[0]["src"]["medium"]

    except Exception as e:
        print(f"Error fetching for {query}: {e}")
        return None

def main():
    with open(INPUT_PATH, "r", encoding="utf-8") as f:
        menu = json.load(f)

    count = 0
    for category in menu:
        cat_name = category.get("category", "")
        for item in category.get("items", []):
            if not item.get("image"):
                query = build_search_query(item["name"], cat_name)
                url = fetch_best_image(query)
                item["image"] = url or "https://via.placeholder.com/150?text=No+Image"
                count += 1
                print(f"[{count}] {item['name']} -> {item['image']}")
                time.sleep(DELAY_SEC)

    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(menu, f, indent=2, ensure_ascii=False)

    print(f"✅ Done. Added images for {count} items.")

if __name__ == "__main__":
    main()
