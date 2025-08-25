const Result = require('../models/resultModel');
const courseScoreService = require('./courseScoreService');
const { cache } = require('../utils/cache/memoryCache');

const CACHE_PREFIX = 'resultService';
const TTL_MS = 60 * 1000; // 1 minute default TTL (adjust as needed)

function sumScoresTotal(courseScores) {
    return courseScores.reduce((acc, score) => acc + (Number(score.total) || 0), 0);
}

async function createOrUpdateResult(studentId, schoolSession, klass, teacherId) {
    const courseScores = await courseScoreService.listScoresByStudent(studentId, schoolSession);
    const subjectIds = courseScores.map(s => s._id);
    const total = sumScoresTotal(courseScores);

    const update = {
        student: studentId,
        class: klass,
        subjects: subjectIds,
        schoolSession,
        total,
        teacher: teacherId
    };

    const result = await Result.findOneAndUpdate(
        { student: studentId, schoolSession },
        update,
        { new: true, upsert: true }
    );
    // Invalidate cache for this student and general listings
    cache.invalidatePrefix(`${CACHE_PREFIX}:student:${studentId}`);
    cache.invalidatePrefix(`${CACHE_PREFIX}:list`);
    return result;
}

async function getStudentResult(studentId, schoolSession, { populate = true } = {}) {
    const key = `${CACHE_PREFIX}:student:${studentId}:session:${schoolSession}:populate:${populate}`;
    const cached = cache.get(key);
    if (cached) return cached;
    let query = Result.findOne({ student: studentId, schoolSession });
    if (populate) query = query.populate('subjects');
    const doc = await query.exec();
    cache.set(key, doc, TTL_MS, { prefix: `${CACHE_PREFIX}:student:${studentId}` });
    return doc;
}

async function getResultById(resultId, { populate = true } = {}) {
    const key = `${CACHE_PREFIX}:byId:${resultId}:populate:${populate}`;
    const cached = cache.get(key);
    if (cached) return cached;
    let query = Result.findById(resultId);
    if (populate) query = query.populate('subjects');
    const doc = await query.exec();
    cache.set(key, doc, TTL_MS, { prefix: `${CACHE_PREFIX}:byId:${resultId}` });
    return doc;
}

async function listResults({ schoolSession, class: klass, studentId, teacherId } = {}, { page = 1, limit = 20, populate = false } = {}) {
    const filter = {};
    if (schoolSession) filter.schoolSession = schoolSession;
    if (klass) filter.class = klass;
    if (studentId) filter.student = studentId;
    if (teacherId) filter.teacher = teacherId;
    const skip = (page - 1) * limit;
    let query = Result.find(filter).skip(skip).limit(limit).sort({ _id: -1 });
    if (populate) query = query.populate('subjects');
    const key = `${CACHE_PREFIX}:list:filter:${JSON.stringify(filter)}:page:${page}:limit:${limit}:populate:${populate}`;
    const cached = cache.get(key);
    if (cached) return cached;
    const [items, total] = await Promise.all([
        query.exec(),
        Result.countDocuments(filter)
    ]);
    const result = { items, total, page, limit, pages: Math.ceil(total / limit) };
    cache.set(key, result, TTL_MS, { prefix: `${CACHE_PREFIX}:list` });
    return result;
}

async function recalcResult(studentId, schoolSession) {
    const courseScores = await courseScoreService.listScoresByStudent(studentId, schoolSession);
    const subjectIds = courseScores.map(s => s._id);
    const total = sumScoresTotal(courseScores);
    const res = await Result.findOneAndUpdate(
        { student: studentId, schoolSession },
        { subjects: subjectIds, total },
        { new: true }
    );
    cache.invalidatePrefix(`${CACHE_PREFIX}:student:${studentId}`);
    cache.invalidatePrefix(`${CACHE_PREFIX}:list`);
    return res;
}

async function deleteResultById(resultId) {
    const res = await Result.findByIdAndDelete(resultId);
    cache.invalidatePrefix(`${CACHE_PREFIX}:byId:${resultId}`);
    cache.invalidatePrefix(`${CACHE_PREFIX}:list`);
    // also invalidate student-specific cache if we can infer studentId
    if (res && res.student) cache.invalidatePrefix(`${CACHE_PREFIX}:student:${res.student}`);
    return res;
}

// Backwards-compatible exported names
async function createResult(studentId, schoolSession, klass, teacherId) {
    const existing = await Result.findOne({ student: studentId, schoolSession });
    if (existing) {
        const error = new Error('Result already exists');
        error.code = 'RESULT_EXISTS';
        throw error;
    }
    const res = await createOrUpdateResult(studentId, schoolSession, klass, teacherId);
    cache.invalidatePrefix(`${CACHE_PREFIX}:student:${studentId}`);
    cache.invalidatePrefix(`${CACHE_PREFIX}:list`);
    return res;
}

module.exports = {
    // primary API
    createOrUpdateResult,
    getStudentResult,
    getResultById,
    listResults,
    recalcResult,
    deleteResultById,
    // legacy
    createResult
};


