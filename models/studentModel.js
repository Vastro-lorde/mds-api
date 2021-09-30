// This is the model for the Staff.

// importing mongoose
const mongoose = require('mongoose');

// created the Schema for the staff using .Schema() method in the mongoose class object creator that's why its mongoose.Schema.
const studentSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: ['true', 'Input your fullname'],
    },
    dateOfBirth: {
        type: String,
        required: ['true', "Input your date of birth"],
    },
    email: {
        type: String,
        required: ['true', "Input your email"],
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
        type: String,
        required: ['true', "Input your address"]
    },
    stateOfOrigin: {
        type: String,
        required: ['true', "Input your state of origin"]
    },
    class: {
        type: String,
        required: ['true', "Input your position"]
    },
    sex: {
        type: String,
        enum: {
            values: ['male', 'female'],
            message: "status can either be 'male' or 'female' !",
        },
        required: ['true', "Input your specialization"]
    },
    profilePic: {
        type: String,
        required: ['true', "Upload your profile picture"]
    }

});

// creates the Staff user using the mongoose model() method which takes in the name of the model and the Schema(in our case staffSchema)
const Staff = mongoose.model('Staff', staffSchema)

// Exporting the Staff model.
module.exports = Staff;