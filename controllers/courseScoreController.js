const courseScoreService = require('../services/courseScoreService');
const { ok, created, serverError } = require('../utils/helpers/http');

exports.create = async (req, res, next) => {
    try {
        const score = await courseScoreService.recordScore(req.body);
        return created(res, score, 'Score recorded');
    } catch (err) {
        return serverError(res, err);
    } finally {
        next();
    }
}

exports.listByStudent = async (req, res, next) => {
    try {
        const scores = await courseScoreService.listScoresByStudent(req.params.studentId, req.query.schoolSession);
        return ok(res, scores);
    } catch (err) {
        return serverError(res, err);
    } finally {
        next();
    }
}

exports.listByCourse = async (req, res, next) => {
    try {
        const scores = await courseScoreService.listScoresByCourse(req.params.courseId, req.query.schoolSession);
        return ok(res, scores);
    } catch (err) {
        return serverError(res, err);
    } finally {
        next();
    }
}

exports.update = async (req, res, next) => {
    try {
        const score = await courseScoreService.updateScore(req.params.id, req.body);
        return ok(res, score, 'Updated');
    } catch (err) {
        return serverError(res, err);
    } finally {
        next();
    }
}

exports.remove = async (req, res, next) => {
    try {
        const score = await courseScoreService.deleteScore(req.params.id);
        return ok(res, score, 'Deleted');
    } catch (err) {
        return serverError(res, err);
    } finally {
        next();
    }
}


