const cloudinary = require('../middlewares/cloudinary');
const staffService = require('../services/staffService');
const { ok, created, badRequest, unauthorized, serverError } = require('../utils/helpers/http');


// controller for signing up  a Staff
exports.signup = async (req, res, next) => {
    try {
        const isAdmin = req.url.toString().includes('admin');
        const staff = await staffService.createStaff(req.body, isAdmin);
        return created(res, staff, 'Welcome to Mater Dei Online');
    } catch (err) {
        return serverError(res, err);
    } finally {
        next();
    }
}

// controller for login in and this generates to jwt token.
exports.login = async (req, res, next) => {
    // Moved to decoupled Auth; controller kept for backward compat to return 401
    try {
        return unauthorized(res, 'Use new /api/auth/login endpoint');
    } catch (err) {
        return serverError(res, err);
    } finally {
        next();
    }
}

// This is the controller for getting a particular staff's detail.
exports.getStaff = async (req, res, next)=>{
    try {
        const staff = await staffService.getById(req.params.id);
        if (!staff) return unauthorized(res, 'No Staff found');
        return ok(res, staff, 'Your details');
    } catch (err) {
        return serverError(res, err);
    }
}


// This is the controller for getting list of active Staff
exports.getActiveStaffs = async (req, res, next)=>{
    try {
        const staffs = await staffService.getByActive(true);
        if (!staffs) return unauthorized(res, 'No active Staff found');
        return ok(res, staffs, 'List of Active Staffs');
    } catch (err) {
        return serverError(res, err);
    }
}


// This is the controller for getting list of inactive Staffs.
exports.getInactiveStaffs = async (req, res, next)=>{
    try {
        const staffs = await staffService.getByActive(false);
        if (!staffs) return unauthorized(res, 'No inactive Staff found');
        return ok(res, staffs, 'List of inactive Staffs');
    } catch (err) {
        return serverError(res, err);
    }
}



// controller for updating a staff's detail including uploading of profile pic.
exports.update = async (req, res, next) => {
    
   
    try {
        const cloudFile = await cloudinary.uploader.upload(req.file.path)
        const updates = {
            ...req.body,
            profilePic: cloudFile.secure_url,
            profilePic_cloudId: cloudFile.public_id
        };
        const staff = await staffService.updateProfile(req.params.id, updates);
        return ok(res, staff, 'Successfully updated details');
    } catch (err) {
        return serverError(res, err);
    } finally {
        next();
    }
}

// controller for deleting a staff
exports.deleteStaff = async(req, res, next) => {
    const {id} = req.body;
    try {
        await staffService.softDelete(id);
        return ok(res, null, 'Successfully removed');
    } catch (err) {
        return serverError(res, err);
    }
}