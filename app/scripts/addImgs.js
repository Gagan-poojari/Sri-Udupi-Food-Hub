const fs = require('fs');
const axios = require('axios');

const API_KEY = 'fySSODu-cOesus6RGKJQGNfqmB-0jiPjJL4VmUw-gCA'; // 🔁 Replace this
const BASE_URL = 'https://api.unsplash.com/search/photos';

async function fetchImage(query) {
    try {
        const response = await axios.get(BASE_URL, {
            headers: {
                Authorization: `Client-ID ${API_KEY}`,
            },
            params: { 
                query,
                per_page: 1,
            },
        });

        if (response.data.results.length > 0) {
            return response.data.results[0].urls.small;
        } else {
            return null;
        }
    } catch (error) {
        console.error(`Error fetching image for "${query}":`, error.message);
        return null;
    }
}

// Load your menu JSON
const data = require('./menu_part.json');

async function updateItems() {
    for (const category of data) {
        for (const item of category.items) {
            const lowerCaseItemName = item.name.toLowerCase();
            const replacedItemName = lowerCaseItemName.replace(' ', '+');
            const refinedItemName = replacedItemName.replace('(', '').replace(')', '');
            const image = await fetchImage(refinedItemName);
            item.image = image || 'https://via.placeholder.com/300?text=No+Image';
            console.log(`✅ ${item.name} → ${image ? 'Image Found' : 'No Image'}`);
        }
    }

    fs.writeFileSync('./sufh_menu_with_images.json', JSON.stringify(data, null, 2));
    console.log('\n🎉 All done! Output saved to sufh_menu_with_images.json');
}

updateItems();
