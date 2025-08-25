const resultService = require('../services/resultService');
const { ok, created, badRequest, serverError } = require('../utils/helpers/http');


// controller for creating a result document.
exports.createResult = async (req, res, next) => {
    try {
        const result = await resultService.createResult(
            req.body.studentId,
            req.body.schoolSession,
            req.body.class,
            req.params.id
        );
        return created(res, result, 'successfully created');
    } catch (err) {
        if (err && err.code === 'RESULT_EXISTS') return badRequest(res, 'Result already exists');
        return serverError(res, err);
    } finally {
        next();
    }
}

exports.getresult = async (req, res) => {
    try {
        const result = await resultService.getStudentResult(req.body.student, req.body.schoolSession);
        if (!result) return badRequest(res, 'Does not exist.');
        return ok(res, result, 'Success.');
    } catch (err) {
        return serverError(res, err);
    }
}