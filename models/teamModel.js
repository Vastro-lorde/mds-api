// Model for teams tied to a sport

const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    sport: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Sport',
        required: true
    },
    logo: {
        type: String
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Student'
    }],
    coach: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Staff'
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Student'
    },
    active: {
        type: Boolean,
        default: true
    }
});

teamSchema.index({ name: 1, sport: 1 }, { unique: true });

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;


