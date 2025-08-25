// This is the model for the Student.

// importing mongoose
const mongoose = require('mongoose');
const { createBaseSchema } = require('./baseModel');
const { isEmail } = require("validator")
const { SexEnum, TitleEnum } = require('../utils/enums/common');
const { StudentAccomodationEnum } = require('../utils/enums/student');


// created the Schema for the student using .Schema() method in the mongoose class object creator that's why its mongoose.Schema.
const studentSchema = createBaseSchema({
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
        type: Date,
        required: ['true', "Input your Date of Birth"],
    },
    email: {
        type: String,
        required: ['true', "Input your email"],
        validate: [isEmail, "Please enter a valid email"],
        unique: true,
        lowercase: true,
        trim: true
    },
    // No password here; handled by decoupled auth model
    phoneNumber: {
        type: String,
        required: ['true', "Input your Phone Number"]
    },
    studentNumber: {
        type: String,
        required: ['true', "Input your Student ID Number"],
        unique: true
    },
    address: {
        type: String,
        required: ['true', "Input your address"]
    },
    stateOfOrigin: {
        type: String,
        required: ['true', "Input your state of origin"]
    },
    class: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Class'
    },
    sex: {
        type: String,
        enum: {
            values: SexEnum,
            message: "sex can either be 'male' or 'female' !",
        },
        required: ['true', "Input your specialization"]
    },
    accomodation: {
        type: String,
        enum: {
            values: StudentAccomodationEnum,
            message: "can either be day or boarder!",
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
    }

}, { toJSON: { getters: true, virtuals: true }, toObject: { getters: true, virtuals: true } });

// creates the student using the mongoose model() method which takes in the name of the model and the Schema(in our case staffSchema)
const Student = mongoose.model('Student', studentSchema);

// Exporting the Student model.
module.exports = Student;