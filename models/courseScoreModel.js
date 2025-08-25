// Model for course scores per student

const mongoose = require('mongoose');
const softDeletePlugin = require('./plugins/softDelete');

const courseScoreSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Course',
        required: true
    },
    firstTest: {
        type: Number,
        default: 0
    },
    secondTest: {
        type: Number,
        default: 0
    },
    exam: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        $sum: ["firstTest", "secondTest", "exam"]
    },
    grade: {
        type: String,
        default: doc => {
            if (doc.total >= 80 && doc.total <= 100) {
                return "A";
            }
            else if (doc.total >= 70 && doc.total <= 79) {
                return "B";
            }
            else if (doc.total >= 60 && doc.total <= 69) {
                return "C";
            }
            else if (doc.total >= 50 && doc.total <= 59) {
                return "D";
            }
            else if (doc.total >= 40 && doc.total <= 49) {
                return "E";
            }
            else if (doc.total >= 0 && doc.total <= 39) {
                return "F";
            }
        }
    },
    class: {
        type: String,
        required: true
    },
    schoolSession: {
        type: String,
        required: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Student'
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Staff'
    },
    deletedAt: {
        type: Date,
        default: null
    }
});

courseScoreSchema.plugin(softDeletePlugin);

const CourseScore = mongoose.model('CourseScore', courseScoreSchema);

module.exports = CourseScore;


