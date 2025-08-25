const studentService = require('../services/studentService');
const cloudinary = require('../middlewares/cloudinary');
const { ok, created, badRequest, unauthorized, serverError } = require('../utils/helpers/http');


// controller for signing up  a Student
exports.signup = async (req, res, next) => {
    try {
        const student = await studentService.createStudent(req.body);
        return created(res, student, 'Student created');
    } catch (err) {
        return serverError(res, err);
    } finally {
        next();
    }
}

// controller for login in and this generates to jwt token.
exports.login = async (req, res, next) => {
    try {
        return unauthorized(res, 'Use new /api/auth/login endpoint');
    } catch (err) {
        return serverError(res, err);
    } finally {
        next();
    }
}

// This is the controller for getting a particular Student's detail.
exports.getStudent = async (req, res, next) => {
    try {
        const student = await studentService.getById(req.params.id);
        if (!student) return unauthorized(res, 'No Student found');
        return ok(res, student, 'Your details');
    } catch (err) {
        return serverError(res, err);
    }
}


// This is the controller for getting list of active Students.
exports.getActiveStudents = async (req, res, next) => {
    try {
        const students = await studentService.getByActive(true);
        if (!students) return unauthorized(res, 'No active Student found');
        return ok(res, students, 'List of Active Students');
    } catch (err) {
        return serverError(res, err);
    }
}


// This is the controller for getting list of inactive Students.
exports.getInactiveStudents = async (req, res, next) => {
    try {
        const students = await studentService.getByActive(false);
        if (!students) return unauthorized(res, 'No inactive Student found');
        return ok(res, students, 'List of inactive Students');
    } catch (err) {
        return serverError(res, err);
    }
}



// controller for updating a Student's detail including uploading of profile pic.
exports.update = async (req, res, next) => {
    try {
        const cloudFile = await cloudinary.uploader.upload(req.file.path)
        const updates = {
            ...req.body,
            profilePic: cloudFile.secure_url,
            profilePic_cloudId: cloudFile.public_id
        };
        const student = await studentService.updateProfile(req.params.id, updates);
        return ok(res, student, 'Successfully updated details');
    } catch (err) {
        return serverError(res, err);
    } finally {
        next();
    }
}

exports.deleteStudent = async (req, res, next) => {
    const { id } = req.body;
    try {
        await studentService.softDelete(id);
        return ok(res, null, 'Successfully removed');
    } catch (err) {
        return serverError(res, err);
    }
}