const Staff = require('../models/staffModel');
const { cache } = require('../utils/cache/memoryCache');

const CACHE_PREFIX = 'staffService';
const TTL_MS = 60 * 1000;

async function createStaff(payload, isAdmin = false) {
    const staffPayload = {
        firstName: payload.firstName,
        middleName: payload.middleName,
        lastName: payload.lastName,
        title: payload.title,
        email: payload.email,
        sex: payload.sex,
        phoneNumber: payload.phoneNumber,
        stateOfOrigin: payload.stateOfOrigin,
        position: payload.position
    };
    if (isAdmin) staffPayload.isAdmin = true;
    const staff = await Staff.create(staffPayload);
    cache.invalidatePrefix(`${CACHE_PREFIX}:list`);
    cache.invalidatePrefix(`${CACHE_PREFIX}:byId`);
    return staff;
}

async function getById(id) {
    const key = `${CACHE_PREFIX}:byId:${id}`;
    const cached = cache.get(key);
    if (cached) return cached;
    const doc = await Staff.findById(id).exec();
    cache.set(key, doc, TTL_MS, { prefix: `${CACHE_PREFIX}:byId:${id}` });
    return doc;
}

async function getByActive(active = true) {
    const key = `${CACHE_PREFIX}:byActive:${active}`;
    const cached = cache.get(key);
    if (cached) return cached;
    const items = await Staff.find({ active }).exec();
    cache.set(key, items, TTL_MS, { prefix: `${CACHE_PREFIX}:list` });
    return items;
}

async function updateProfile(id, updates) {
    const doc = await Staff.findByIdAndUpdate(id, updates, { new: true });
    cache.invalidatePrefix(`${CACHE_PREFIX}:byId:${id}`);
    cache.invalidatePrefix(`${CACHE_PREFIX}:list`);
    return doc;
}

async function softDelete(id) {
    const res = await Staff.softDeleteById(id);
    cache.invalidatePrefix(`${CACHE_PREFIX}:byId:${id}`);
    cache.invalidatePrefix(`${CACHE_PREFIX}:list`);
    return res;
}

module.exports = {
    createStaff,
    getById,
    getByActive,
    updateProfile,
    softDelete
};


