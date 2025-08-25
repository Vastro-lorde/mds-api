const Department = require('../models/departmentModel');
const { cache } = require('../utils/cache/memoryCache');

const CACHE_PREFIX = 'departmentService';
const TTL_MS = 60 * 1000;

async function createDepartment(payload) {
    const doc = await Department.create(payload);
    cache.invalidatePrefix(`${CACHE_PREFIX}:list`);
    return doc;
}

async function listDepartments(filter = {}) {
    const key = `${CACHE_PREFIX}:list:${JSON.stringify(filter)}`;
    const cached = cache.get(key);
    if (cached) return cached;
    const items = await Department.find(filter).exec();
    cache.set(key, items, TTL_MS, { prefix: `${CACHE_PREFIX}:list` });
    return items;
}

async function getDepartmentById(id) {
    const key = `${CACHE_PREFIX}:byId:${id}`;
    const cached = cache.get(key);
    if (cached) return cached;
    const doc = await Department.findById(id).exec();
    cache.set(key, doc, TTL_MS, { prefix: `${CACHE_PREFIX}:byId:${id}` });
    return doc;
}

async function updateDepartment(id, updates) {
    const doc = await Department.findByIdAndUpdate(id, updates, { new: true });
    cache.invalidatePrefix(`${CACHE_PREFIX}:byId:${id}`);
    cache.invalidatePrefix(`${CACHE_PREFIX}:list`);
    return doc;
}

async function deleteDepartment(id) {
    const res = await Department.softDeleteById(id);
    cache.invalidatePrefix(`${CACHE_PREFIX}:byId:${id}`);
    cache.invalidatePrefix(`${CACHE_PREFIX}:list`);
    return res;
}

async function assignTeacher(deptId, teacherId) {
    const doc = await Department.findByIdAndUpdate(deptId, { $addToSet: { teachers: teacherId } }, { new: true });
    cache.invalidatePrefix(`${CACHE_PREFIX}:byId:${deptId}`);
    cache.invalidatePrefix(`${CACHE_PREFIX}:list`);
    return doc;
}

async function removeTeacher(deptId, teacherId) {
    const doc = await Department.findByIdAndUpdate(deptId, { $pull: { teachers: teacherId } }, { new: true });
    cache.invalidatePrefix(`${CACHE_PREFIX}:byId:${deptId}`);
    cache.invalidatePrefix(`${CACHE_PREFIX}:list`);
    return doc;
}

module.exports = {
    createDepartment,
    listDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment,
    assignTeacher,
    removeTeacher
};


