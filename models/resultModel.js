// This is the model for the News.

// importing mongoose
const mongoose = require('mongoose');

// created the Schema for the results which takes in the subschema of subject for the subjects key[].
const resultSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Student'
    },
    subjects: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Subject',
        required: true
    }],
    total: {
        type : Number,
        default: 0
    },
    class:{
        type: String,
        required: ['true', "Class cannot be empty"]
    },
    dateCreated: {
        type: String,
        default: Date.now(),
        required: ['true']
    },
    schoolSession : {
        type : String,
        required : true
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Staff'
    }

});

resultSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'student',
        select: '_id fullname class sex studentNumber profilePic profilePic_cloudId'
    });
    next();
});
// creates the Result using the mongoose model() method which takes in the name of the model and the Schema(in our case staffSchema)
const Result = mongoose.model('Result', resultSchema);

// Exporting the Result model.
module.exports = Result;