// This is the model for the Staff.

// importing mongoose
const mongoose = require('mongoose');

// created the Schema for the staff using .Schema() method in the mongoose class object creator that's why its mongoose.Schema.
const staffSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: ['true', 'Input your fullname'],
    },
    dateOfBirth: {
        type: String
    },
    email: {
        type: String,
        required: ['true', "Input your email"],
    },
    sex: {
        type: String,
        enum: {
            values: ['male', 'female'],
            message: "status can either be 'male' or 'female' !",
        },
        required: ['true', "Input your specialization"]
    },
    password: {
        type: String,
        required: ['true', "Input your password"]
    },
    phoneNumber: {
        type: String,
        required: ['true', "Input your phone number"]
    },
    address: {
        type: String
    },
    stateOfOrigin: {
        type: String,
        required: ['true', "Input your state of origin"]
    },
    position: {
        type: String,
        required: ['true', "Input your position"]
    },
    specialization: {
        type: String
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

});

// creates the Staff user using the mongoose model() method which takes in the name of the model and the Schema(in our case staffSchema)
const Staff = mongoose.model('Staff', staffSchema)

// Exporting the Staff model.
module.exports = Staff;