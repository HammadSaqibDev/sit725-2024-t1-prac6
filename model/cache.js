// Add caching layer to reduce the number of database queries and to retrieve data faster 
const NodeCache = require("node-cache");

const cache = new NodeCache();

function getCache(key) {
    return cache.get(key);
}

function saveCache(key, value) {
    cache.set(key, value);
}

module.exports = {
    getCache,
    saveCache,
};