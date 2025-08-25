// Model for school sports

const mongoose = require('mongoose');
const { createBaseSchema } = require('./baseModel');

const sportSchema = createBaseSchema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String
    },
    staffsInCharge: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Staff'
    }],
});

const Sport = mongoose.model('Sport', sportSchema);

module.exports = Sport;


