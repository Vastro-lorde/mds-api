const News = require('../models/newsModel');
const cloudinaryService = require('./cloudinaryService');
const { cache } = require('../utils/cache/memoryCache');

const CACHE_PREFIX = 'newsService';
const TTL_MS = 60 * 1000;

async function listAll() {
    const key = `${CACHE_PREFIX}:listAll`;
    const cached = cache.get(key);
    if (cached) return cached;
    const items = await News.find().exec();
    cache.set(key, items, TTL_MS, { prefix: `${CACHE_PREFIX}:list` });
    return items;
}

async function create(payload) {
    const doc = await News.create(payload);
    cache.invalidatePrefix(`${CACHE_PREFIX}:list`);
    return doc;
}

// Create a news item and upload picture to Cloudinary if provided
async function createWithUpload(data = {}, file) {
    let picture, picture_cloudId;
    if (file && (file.buffer || file.path)) {
        const upload = file.buffer
            ? await cloudinaryService.uploadBuffer(file.buffer, { folder: 'news' })
            : await cloudinaryService.uploadFile(file.path, { folder: 'news' });
        picture = upload.secureUrl || upload.url;
        picture_cloudId = upload.publicId;
    }
    const payload = {
        title: data.title,
        text: data.text,
        date: data.date ? new Date(data.date) : Date.now(),
        picture,
        picture_cloudId,
    };
    const doc = await create(payload);
    return doc;
}

async function findOneByTitleAndDate(title, date) {
    const d = date ? new Date(date) : undefined;
    const key = `${CACHE_PREFIX}:byTitleDate:${title}:${d ? d.toISOString() : 'none'}`;
    const cached = cache.get(key);
    if (cached) return cached;
    const doc = await News.findOne({ title, ...(d ? { date: d } : {}) }).exec();
    cache.set(key, doc, TTL_MS, { prefix: `${CACHE_PREFIX}:byTitleDate:${title}` });
    return doc;
}

async function removeByTitleAndDate(title, date) {
    // Clean up cloudinary asset if present
    const existing = await findOneByTitleAndDate(title, date);
    if (existing && existing.picture_cloudId) {
        try { await cloudinaryService.deleteResource(existing.picture_cloudId); } catch (_) {}
    }
    const d = date ? new Date(date) : undefined;
    const res = await News.softDeleteOne({ title, ...(d ? { date: d } : {}) });
    cache.invalidatePrefix(`${CACHE_PREFIX}:list`);
    cache.invalidatePrefix(`${CACHE_PREFIX}:byTitleDate:${title}`);
    return res;
}

module.exports = {
    listAll,
    create,
    createWithUpload,
    findOneByTitleAndDate,
    removeByTitleAndDate
};


