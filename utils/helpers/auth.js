const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_TTL_SECONDS = 15 * 60; // 15 minutes
const REFRESH_TOKEN_TTL_DAYS = 30; // 30 days

function signAccessToken(payload, options = {}) {
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: ACCESS_TOKEN_TTL_SECONDS, ...options });
}

function signRefreshToken(payload, options = {}) {
    const seconds = REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60;
    return jwt.sign(payload, process.env.REFRESH_SECRET_KEY || process.env.SECRET_KEY, { expiresIn: seconds, ...options });
}

function verifyAccessToken(token) {
    return jwt.verify(token, process.env.SECRET_KEY);
}

function verifyRefreshToken(token) {
    return jwt.verify(token, process.env.REFRESH_SECRET_KEY || process.env.SECRET_KEY);
}

module.exports = {
    ACCESS_TOKEN_TTL_SECONDS,
    REFRESH_TOKEN_TTL_DAYS,
    signAccessToken,
    signRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
};


