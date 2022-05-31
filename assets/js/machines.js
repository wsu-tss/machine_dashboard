import { API_ENDPOINT } from './config.js';
import { byUsage } from './utils.js';
import { apiData } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    // TODO
    let data = apiData(API_ENDPOINT);

    console.log(data);
})
