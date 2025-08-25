// Model for school classes and staff in charge (class teacher)

const mongoose = require('mongoose');
const { createBaseSchema } = require('./baseModel');

const classSchema = createBaseSchema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String
    },
    staffInCharge: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Staff'
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Student'
    }],
});

const SchoolClass = mongoose.model('Class', classSchema);

module.exports = SchoolClass;


