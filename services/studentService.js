const Student = require('../models/studentModel');
const { cache } = require('../utils/cache/memoryCache');

const CACHE_PREFIX = 'studentService';
const TTL_MS = 60 * 1000;

async function createStudent(payload) {
    const studentPayload = {
        firstName: payload.firstName,
        middleName: payload.middleName,
        lastName: payload.lastName,
        title: payload.title,
        email: payload.email,
        sex: payload.sex,
        phoneNumber: payload.phoneNumber,
        stateOfOrigin: payload.stateOfOrigin,
        class: payload.class,
        address: payload.address,
        studentNumber: payload.studentNumber
    };
    const student = await Student.create(studentPayload);
    cache.invalidatePrefix(`${CACHE_PREFIX}:list`);
    cache.invalidatePrefix(`${CACHE_PREFIX}:byId`);
    return student;
}

async function getById(id) {
    const key = `${CACHE_PREFIX}:byId:${id}`;
    const cached = cache.get(key);
    if (cached) return cached;
    const doc = await Student.findById(id).exec();
    cache.set(key, doc, TTL_MS, { prefix: `${CACHE_PREFIX}:byId:${id}` });
    return doc;
}

async function getByActive(active = true) {
    const key = `${CACHE_PREFIX}:byActive:${active}`;
    const cached = cache.get(key);
    if (cached) return cached;
    const items = await Student.find({ active }).exec();
    cache.set(key, items, TTL_MS, { prefix: `${CACHE_PREFIX}:list` });
    return items;
}

async function updateProfile(id, updates) {
    const doc = await Student.findByIdAndUpdate(id, updates, { new: true });
    cache.invalidatePrefix(`${CACHE_PREFIX}:byId:${id}`);
    cache.invalidatePrefix(`${CACHE_PREFIX}:list`);
    return doc;
}

async function softDelete(id) {
    const res = await Student.softDeleteById(id);
    cache.invalidatePrefix(`${CACHE_PREFIX}:byId:${id}`);
    cache.invalidatePrefix(`${CACHE_PREFIX}:list`);
    return res;
}

module.exports = {
    createStudent,
    getById,
    getByActive,
    updateProfile,
    softDelete
};


