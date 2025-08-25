// Department model

const mongoose = require('mongoose');
const { createBaseSchema } = require('./baseModel');

const departmentSchema = createBaseSchema({
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    },
    head: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Staff',
        required: true
    },
    teachers: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Staff'
    }],
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;


