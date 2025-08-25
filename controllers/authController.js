const authService = require('../services/authService');
const { ok, created, badRequest, unauthorized, serverError } = require('../utils/helpers/http');

exports.register = async (req, res, next) => {
    try {
        const auth = await authService.register(req.body);
        return created(res, { id: auth._id }, 'Registered');
    } catch (err) {
        if (err.code === 'EMAIL_EXISTS') return badRequest(res, 'Email already registered');
        return serverError(res, err);
    } finally {
        next();
    }
}

exports.login = async (req, res, next) => {
    try {
        const tokens = await authService.login(req.body);
        return ok(res, tokens, 'Logged in');
    } catch (err) {
        if (err.code === 'INVALID_CREDENTIALS') return unauthorized(res, 'Invalid credentials');
        return serverError(res, err);
    } finally {
        next();
    }
}

exports.refresh = async (req, res, next) => {
    try {
        const token = await authService.refresh({ refreshToken: req.body.refreshToken });
        return ok(res, token, 'Token refreshed');
    } catch (err) {
        return unauthorized(res, 'Invalid refresh token');
    } finally {
        next();
    }
}

exports.logout = async (req, res, next) => {
    try {
        await authService.logout({ accessToken: req.headers.authorization, refreshToken: req.body.refreshToken });
        return ok(res, null, 'Logged out');
    } catch (err) {
        return serverError(res, err);
    } finally {
        next();
    }
}


