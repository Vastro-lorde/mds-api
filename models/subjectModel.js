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
    grade : {
        type : String,
        default: doc => {
            if(doc.total >= 80 && doc.total <= 100){
                return "A";
            }
            else if(doc.total >= 70 && doc.total <= 79){
                return "B";
            }
            else if(doc.total >= 60 && doc.total <= 69){
                return "C";
            }
            else if(doc.total >= 50 && doc.total <= 59){
                return "D";
            }
            else if(doc.total >= 40 && doc.total <= 49){
                return "E";
            }
            else if(doc.total >= 0 && doc.total <= 39){
                return "F";
            }
        }
    },
    class : {
        type : String,
        required : true
    },
    schoolSession : {
        type : String,
        required : true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Student'
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Staff'
    }
});

// creates the student using the mongoose model() method which takes in the name of the model and the Schema(in our case staffSchema)
const Subject = mongoose.model('Subject', subjectSchema);

// Exporting the Student model.
module.exports = Subject;