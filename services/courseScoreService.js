const CourseScore = require('../models/courseScoreModel');
const { cache } = require('../utils/cache/memoryCache');

const CACHE_PREFIX = 'courseScoreService';
const TTL_MS = 60 * 1000;

async function recordScore(payload) {
    const doc = await CourseScore.create(payload);
    if (payload.student) cache.invalidatePrefix(`${CACHE_PREFIX}:student:${payload.student}`);
    if (payload.course) cache.invalidatePrefix(`${CACHE_PREFIX}:course:${payload.course}`);
    cache.invalidatePrefix(`${CACHE_PREFIX}:list`);
    return doc;
}

async function listScoresByStudent(studentId, schoolSession) {
    const filter = { student: studentId };
    if (schoolSession) filter.schoolSession = schoolSession;
    const key = `${CACHE_PREFIX}:student:${studentId}:session:${schoolSession || 'any'}`;
    const cached = cache.get(key);
    if (cached) return cached;
    const items = await CourseScore.find(filter).populate('course').exec();
    cache.set(key, items, TTL_MS, { prefix: `${CACHE_PREFIX}:student:${studentId}` });
    return items;
}

async function listScoresByCourse(courseId, schoolSession) {
    const filter = { course: courseId };
    if (schoolSession) filter.schoolSession = schoolSession;
    const key = `${CACHE_PREFIX}:course:${courseId}:session:${schoolSession || 'any'}`;
    const cached = cache.get(key);
    if (cached) return cached;
    const items = await CourseScore.find(filter).populate('student').exec();
    cache.set(key, items, TTL_MS, { prefix: `${CACHE_PREFIX}:course:${courseId}` });
    return items;
}

async function updateScore(id, updates) {
    const doc = await CourseScore.findByIdAndUpdate(id, updates, { new: true });
    if (doc && doc.student) cache.invalidatePrefix(`${CACHE_PREFIX}:student:${doc.student}`);
    if (doc && doc.course) cache.invalidatePrefix(`${CACHE_PREFIX}:course:${doc.course}`);
    cache.invalidatePrefix(`${CACHE_PREFIX}:list`);
    return doc;
}

async function deleteScore(id) {
    const doc = await CourseScore.findById(id);
    const res = await CourseScore.softDeleteById(id);
    if (doc && doc.student) cache.invalidatePrefix(`${CACHE_PREFIX}:student:${doc.student}`);
    if (doc && doc.course) cache.invalidatePrefix(`${CACHE_PREFIX}:course:${doc.course}`);
    cache.invalidatePrefix(`${CACHE_PREFIX}:list`);
    return res;
}

module.exports = {
    recordScore,
    listScoresByStudent,
    listScoresByCourse,
    updateScore,
    deleteScore
};


