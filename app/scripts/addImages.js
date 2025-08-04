const fs = require('fs');
const axios = require('axios');

const API_KEY = "563492ad6f91700001000001b4TG508VwhcIW1shF7UzWafEZoW77vXl1kXsPf97632NgFtocIwnZetVUG";
const BASE_URL = 'https://api.pexels.com/v1/search';

async function fetchImage(query) {
    try{
        const response = await axios.get(BASE_URL, {
            headers: { Authorization: API_KEY },
            params: { query, per_page: 1}
        });
        if (response.data.photos.length > 0) {
            return response.data.photos[0].src.medium;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching image:', query, error.message);
        return null;
    }
}

const data = require('./sufh_menu.json');

async function updateItems() {
    for (const category of data) {
        for (const item of category.items){
            const image = await fetchImage(item.name);
            item.image = image || '';
            console.log(item.name, image);
        }
    }
    fs.writeFileSync('./sufh_menu_w_img.json', JSON.stringify(data, null, 2));
    console.log("Done :)")
}

updateItems();