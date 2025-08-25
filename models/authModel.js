// Decoupled auth model

const mongoose = require('mongoose');
const { createBaseSchema } = require('./baseModel');
const { isEmail } = require('validator');

const { RoleEnum } = require('../utils/enums/auth');

const authSchema = createBaseSchema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        required: true,
        enum: RoleEnum
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'userType'
    },
    userType: {
        type: String,
        required: true,
        enum: ['Student', 'Staff']
    },
    lastLoginAt: {
        type: Date
    },
    isActive: {
        type: Boolean,
        default: true
    },
    refreshTokenHash: {
        type: String,
        select: false
    },
    refreshTokenExpiresAt: {
        type: Date
    }
});

authSchema.index({ role: 1, user: 1, userType: 1 }, { unique: true });

const Auth = mongoose.model('Auth', authSchema);

module.exports = Auth;


