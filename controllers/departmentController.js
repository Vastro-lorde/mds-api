const departmentService = require('../services/departmentService');
const { ok, created, serverError } = require('../utils/helpers/http');

exports.create = async (req, res, next) => {
    try {
        const dept = await departmentService.createDepartment(req.body);
        return created(res, dept, 'Department created');
    } catch (err) {
        return serverError(res, err);
    } finally {
        next();
    }
}

exports.list = async (req, res, next) => {
    try {
        const depts = await departmentService.listDepartments(req.query || {});
        return ok(res, depts);
    } catch (err) {
        return serverError(res, err);
    } finally {
        next();
    }
}

exports.get = async (req, res, next) => {
    try {
        const dept = await departmentService.getDepartmentById(req.params.id);
        return ok(res, dept);
    } catch (err) {
        return serverError(res, err);
    } finally {
        next();
    }
}

exports.update = async (req, res, next) => {
    try {
        const dept = await departmentService.updateDepartment(req.params.id, req.body);
        return ok(res, dept, 'Updated');
    } catch (err) {
        return serverError(res, err);
    } finally {
        next();
    }
}

exports.remove = async (req, res, next) => {
    try {
        const dept = await departmentService.deleteDepartment(req.params.id);
        return ok(res, dept, 'Deleted');
    } catch (err) {
        return serverError(res, err);
    } finally {
        next();
    }
}

exports.assignTeacher = async (req, res, next) => {
    try {
        const dept = await departmentService.assignTeacher(req.params.id, req.body.teacherId);
        return ok(res, dept, 'Teacher assigned');
    } catch (err) {
        return serverError(res, err);
    } finally {
        next();
    }
}

exports.removeTeacher = async (req, res, next) => {
    try {
        const dept = await departmentService.removeTeacher(req.params.id, req.body.teacherId);
        return ok(res, dept, 'Teacher removed');
    } catch (err) {
        return serverError(res, err);
    } finally {
        next();
    }
}


