// This is the model for the News.

// importing mongoose
const mongoose = require('mongoose');

// created the Schema for the subject scores using .Schema() method in the mongoose class object creator that's why its mongoose.Schema.
const subjectSchema = new mongoose.Schema({
    subject : { 
        type : String,
        required : true
    },
    firstTest : {
        type : Number,
        default: 0
    },
    secondTest : {
        type : Number,
        default: 0
    },
    exam : {
        type : Number,
        default: 0
    }, 
    total : {
        type : Number,
        $sum: ["firstTest","secondTest","exam"]
    },
    student: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Student'
    }
})

// created the Schema for the results which takes in the subschema of subject for the subjects key[].
const resultSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Student'
    },
    subjects: [subjectSchema],
    total: {
        type : Number,
        default: 0
    },
    class:{
        type: String,
        required: ['true', "Class cannot be empty"]
    },
    date: {
        type: String,
        default: Date.now(),
        required: ['true']
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