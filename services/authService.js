const bcrypt = require('bcrypt');
const { signAccessToken, signRefreshToken, verifyRefreshToken, REFRESH_TOKEN_TTL_DAYS } = require('../utils/helpers/auth');
const Auth = require('../models/authModel');
const { Roles } = require('../utils/enums/auth');

// TTLs and sign/verify moved to helpers

async function register({ email, password, role, userId, userType }) {
    const existing = await Auth.findOne({ email });
    if (existing) {
        const err = new Error('Email already registered');
        err.code = 'EMAIL_EXISTS';
        throw err;
    }
    const hashed = await bcrypt.hash(password, 10);
    const auth = await Auth.create({ email, password: hashed, role, user: userId, userType });
    return auth;
}

async function login({ email, password }) {
    const auth = await Auth.findOne({ email }).select('+password');
    if (!auth) {
        const err = new Error('Invalid credentials');
        err.code = 'INVALID_CREDENTIALS';
        throw err;
    }
    const ok = await bcrypt.compare(password, auth.password);
    if (!ok) {
        const err = new Error('Invalid credentials');
        err.code = 'INVALID_CREDENTIALS';
        throw err;
    }

    const accessToken = signAccessToken({ sub: auth._id, role: auth.role, userId: auth.user, userType: auth.userType });
    const refreshToken = signRefreshToken({ sub: auth._id });
    const refreshHash = await bcrypt.hash(refreshToken, 10);
    const expires = new Date(Date.now() + REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000);
    await Auth.updateOne({ _id: auth._id }, { refreshTokenHash: refreshHash, refreshTokenExpiresAt: expires, lastLoginAt: new Date() });
    return { accessToken, refreshToken };
}

async function refresh({ refreshToken }) {
    try {
        const payload = verifyRefreshToken(refreshToken);
        const auth = await Auth.findById(payload.sub).select('+refreshTokenHash');
        if (!auth || !auth.refreshTokenHash || !auth.refreshTokenExpiresAt || auth.refreshTokenExpiresAt < new Date()) {
            const err = new Error('Invalid refresh token');
            err.code = 'INVALID_REFRESH';
            throw err;
        }
        const match = await bcrypt.compare(refreshToken, auth.refreshTokenHash);
        if (!match) {
            const err = new Error('Invalid refresh token');
            err.code = 'INVALID_REFRESH';
            throw err;
        }
        const accessToken = signAccessToken({ sub: auth._id, role: auth.role, userId: auth.user, userType: auth.userType });
        return { accessToken };
    } catch (err) {
        err.code = 'INVALID_REFRESH';
        throw err;
    }
}

async function logout({ accessToken, refreshToken }) {
    // Invalidate refresh token by clearing stored hash
    try {
        const payload = accessToken ? null : null;
    } catch {}
    if (refreshToken) {
        try {
            const payload = verifyRefreshToken(refreshToken);
            await Auth.updateOne({ _id: payload.sub }, { refreshTokenHash: null, refreshTokenExpiresAt: null });
        } catch {}
    }
}

module.exports = {
    register,
    login,
    refresh,
    logout
};


