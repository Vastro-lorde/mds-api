// This is a middleware for the Json Web Token authorization
const { verifyAccessToken } = require('../utils/helpers/auth');
const Auth = require('../models/authModel');
const { Roles } = require('../utils/enums/auth');

const idcheck = async (req, res, next) => {
	try {
		// authenticate must run before this middleware
		if (!req.auth) {
			return res.status(401).json({ status: 'fail', message: 'Authentication required' });
		}

		const targetId = String(
			req.params.id ||
			req.params.userId ||
			req.body?.id ||
			req.body?.userId ||
			''
		);
		if (!targetId) return res.status(400).json({ status: 'fail', message: 'Missing target id' });

		const ownerId = String(req.auth.user);
		const isOwner = ownerId === targetId;
		const isAdmin = req.auth.role === Roles.ADMIN;
		if (!isOwner && !isAdmin) {
			return res.status(401).json({
				status: 'failed',
				message: 'This user is not authorized'
			});
		}
		return next();
	} catch (error) {
		console.error(error);
		return res.status(401).json({ status: 'fail', message: 'Unauthorized' });
	}
}
// Legacy exports removed; use roleCheck/authenticate/authorize instead
module.exports = { idcheck };

// New standard middlewares
async function authenticate(req, res, next) {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ status: 'fail', message: 'Missing token' });
    try {
        const payload = verifyAccessToken(token);
        const auth = await Auth.findById(payload.sub);
        if (!auth || auth.isActive === false) return res.status(401).json({ status: 'fail', message: 'Invalid token' });
        req.auth = auth;
        return next();
    } catch (err) {
        return res.status(401).json({ status: 'fail', message: 'Invalid token' });
    }
}

function authorize(...roles) {
    return (req, res, next) => {
        // authenticate must precede this middleware
        if (!req.auth) return res.status(401).json({ status: 'fail', message: 'Authentication required' });
        if (roles.length > 0 && !roles.includes(req.auth.role)) {
            return res.status(403).json({ status: 'fail', message: 'Forbidden' });
        }
        return next();
    };
}

module.exports.authenticate = authenticate;
module.exports.authorize = authorize;

// Role check helper to eliminate repeated admin/staff/student checks
function roleCheck(...roles) {
    return [authenticate, authorize(...roles)];
}

module.exports.roleCheck = roleCheck;