// This is the model for the Student.

// importing mongoose
const mongoose = require('mongoose');

// created the Schema for the student using .Schema() method in the mongoose class object creator that's why its mongoose.Schema.
const studentSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: ['true', "Input your Full name"],
    },
    dateOfBirth: {
        type: String,
        required: ['true', "Input your Date of Birth"],
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
        required: ['true', "Input your Phone Number"]
    },
    studentNumber: {
        type: String,
        required: ['true', "Input your Student ID Number"]
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
            message: "sex can either be 'male' or 'female' !",
        },
        required: ['true', "Input your specialization"]
    },
    accomodation: {
        type: String,
        enum: {
            values: ['boarder', 'day'],
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

});

// creates the student using the mongoose model() method which takes in the name of the model and the Schema(in our case staffSchema)
const Student = mongoose.model('Student', studentSchema);

// Exporting the Student model.
module.exports = Student;