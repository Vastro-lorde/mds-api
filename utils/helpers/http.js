// HTTP response helper functions

function ok(res, data = null, message = 'Success') {
    return res.status(200).json({ status: 'success', message, data });
}

function created(res, data = null, message = 'Created') {
    return res.status(201).json({ status: 'success', message, data });
}

function noContent(res) {
    return res.status(204).send();
}

function badRequest(res, message = 'Bad Request', data = null) {
    return res.status(400).json({ status: 'fail', message, data });
}

function unauthorized(res, message = 'Unauthorized', data = null) {
    return res.status(401).json({ status: 'fail', message, data });
}

function forbidden(res, message = 'Forbidden', data = null) {
    return res.status(403).json({ status: 'fail', message, data });
}

function notFound(res, message = 'Not Found', data = null) {
    return res.status(404).json({ status: 'fail', message, data });
}

function serverError(res, error, defaultMessage = 'Internal Server Error') {
    const message = error && error.message ? error.message : defaultMessage;
    return res.status(500).json({ status: 'fail', message });
}

module.exports = {
    ok,
    created,
    noContent,
    badRequest,
    unauthorized,
    forbidden,
    notFound,
    serverError
};


