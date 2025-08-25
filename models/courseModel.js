// Model for Course entity (master data)

const mongoose = require('mongoose');
const { createBaseSchema } = require('./baseModel');

const courseSchema = createBaseSchema({
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    },
    department: {
        type: String,
        trim: true
    },
    classLevel: {
        type: String,
        trim: true
    },
    creditLoad: {
        type: Number,
        default: 0
    },
    isCompulsory: {
        type: Boolean,
        default: false
    },
    teachers: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Staff'
    }],
    active: {
        type: Boolean,
        default: true
    }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;


