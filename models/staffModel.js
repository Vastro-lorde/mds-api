// This is the model for the Staff.

// importing mongoose
const mongoose = require('mongoose');
const { createBaseSchema } = require('./baseModel');
const { isEmail } = require("validator")
const { SexEnum, TitleEnum } = require('../utils/enums/common');
const { StaffAccomodationEnum, EmploymentTypeEnum } = require('../utils/enums/staff');


// created the Schema for the staff using .Schema() method in the mongoose class object creator that's why its mongoose.Schema.
const staffSchema = createBaseSchema({
    firstName: {
        type: String,
        required: ['true', 'First name is required'],
        trim: true
    },
    middleName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        required: ['true', 'Last name is required'],
        trim: true
    },
    title: {
        type: String,
        enum: TitleEnum
    },
    fullname: {
        type: String,
        get: function () {
            return [this.firstName, this.middleName, this.lastName].filter(Boolean).join(' ');
        }
    },
    dateOfBirth: {
        type: Date
    },
    email: {
        type: String,
        required: ['true', "Input your email"],
        validate: [isEmail, "Please enter a valid email"],
        unique: true,
        lowercase: true,
        trim: true
    },
    sex: {
        type: String,
        enum: {
            values: SexEnum,
            message: "status can either be 'male' or 'female' !",
        },
        required: ['true', "Input your specialization"]
    },
    // No password here; handled by decoupled auth model
    phoneNumber: {
        type: String,
        required: ['true', "Input your phone number"]
    },
    staffNumber: {
        type: String
    },
    address: {
        type: String
    },
    accomodation: {
        type: String,
        enum: {
            values: StaffAccomodationEnum,
            message: "can either be Resident or Outside School!",
        }
    },
    stateOfOrigin: {
        type: String
    },
    position: {
        type: String
    },
    specialization: {
        type: String
    },
    employment: {
        type: String,
        enum: {
            values: EmploymentTypeEnum,
            message: "can either be Full-time or Part-time!",
        }
    },
    profilePic: {
        type: String,
    },
    profilePic_cloudId: {
        type: String,
    },
    active: {
        type: Boolean,
        default: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }

}, { toJSON: { getters: true, virtuals: true }, toObject: { getters: true, virtuals: true } });

// creates the Staff user using the mongoose model() method which takes in the name of the model and the Schema(in our case staffSchema)
const Staff = mongoose.model('Staff', staffSchema)

// Exporting the Staff model.
module.exports = Staff;