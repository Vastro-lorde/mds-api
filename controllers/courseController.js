const courseService = require('../services/courseService');
const { ok, created, badRequest, serverError } = require('../utils/helpers/http');

exports.create = async (req, res, next) => {
    try {
        const course = await courseService.createCourse(req.body);
        return created(res, course, 'Course created');
    } catch (err) {
        return serverError(res, err);
    } finally {
        next();
    }
}

exports.list = async (req, res, next) => {
    try {
        const courses = await courseService.listCourses(req.query || {});
        return ok(res, courses);
    } catch (err) {
        return serverError(res, err);
    } finally {
        next();
    }
}

exports.get = async (req, res, next) => {
    try {
        const course = await courseService.getCourseById(req.params.id);
        return ok(res, course);
    } catch (err) {
        return serverError(res, err);
    } finally {
        next();
    }
}

exports.update = async (req, res, next) => {
    try {
        const course = await courseService.updateCourse(req.params.id, req.body);
        return ok(res, course, 'Updated');
    } catch (err) {
        return serverError(res, err);
    } finally {
        next();
    }
}

exports.remove = async (req, res, next) => {
    try {
        const course = await courseService.deleteCourse(req.params.id);
        return ok(res, course, 'Deleted');
    } catch (err) {
        return serverError(res, err);
    } finally {
        next();
    }
}

exports.assignTeacher = async (req, res, next) => {
    try {
        const course = await courseService.assignTeacher(req.params.id, req.body.teacherId);
        return ok(res, course, 'Teacher assigned');
    } catch (err) {
        return serverError(res, err);
    } finally {
        next();
    }
}

exports.removeTeacher = async (req, res, next) => {
    try {
        const course = await courseService.removeTeacher(req.params.id, req.body.teacherId);
        return ok(res, course, 'Teacher removed');
    } catch (err) {
        return serverError(res, err);
    } finally {
        next();
    }
}


