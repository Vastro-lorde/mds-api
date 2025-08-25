const Course = require('../models/courseModel');
const { cache } = require('../utils/cache/memoryCache');

const CACHE_PREFIX = 'courseService';
const TTL_MS = 60 * 1000;

async function createCourse(payload) {
    const doc = await Course.create(payload);
    cache.invalidatePrefix(`${CACHE_PREFIX}:list`);
    return doc;
}

async function listCourses(filter = {}) {
    const key = `${CACHE_PREFIX}:list:${JSON.stringify(filter)}`;
    const cached = cache.get(key);
    if (cached) return cached;
    const items = await Course.find(filter).exec();
    cache.set(key, items, TTL_MS, { prefix: `${CACHE_PREFIX}:list` });
    return items;
}

async function getCourseById(id) {
    const key = `${CACHE_PREFIX}:byId:${id}`;
    const cached = cache.get(key);
    if (cached) return cached;
    const doc = await Course.findById(id).exec();
    cache.set(key, doc, TTL_MS, { prefix: `${CACHE_PREFIX}:byId:${id}` });
    return doc;
}

async function updateCourse(id, updates) {
    const doc = await Course.findByIdAndUpdate(id, updates, { new: true });
    cache.invalidatePrefix(`${CACHE_PREFIX}:byId:${id}`);
    cache.invalidatePrefix(`${CACHE_PREFIX}:list`);
    return doc;
}

async function deleteCourse(id) {
    const res = await Course.softDeleteById(id);
    cache.invalidatePrefix(`${CACHE_PREFIX}:byId:${id}`);
    cache.invalidatePrefix(`${CACHE_PREFIX}:list`);
    return res;
}

async function assignTeacher(courseId, teacherId) {
    const doc = await Course.findByIdAndUpdate(courseId, { $addToSet: { teachers: teacherId } }, { new: true });
    cache.invalidatePrefix(`${CACHE_PREFIX}:byId:${courseId}`);
    cache.invalidatePrefix(`${CACHE_PREFIX}:list`);
    return doc;
}

async function removeTeacher(courseId, teacherId) {
    const doc = await Course.findByIdAndUpdate(courseId, { $pull: { teachers: teacherId } }, { new: true });
    cache.invalidatePrefix(`${CACHE_PREFIX}:byId:${courseId}`);
    cache.invalidatePrefix(`${CACHE_PREFIX}:list`);
    return doc;
}

module.exports = {
    createCourse,
    listCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
    assignTeacher,
    removeTeacher
};


