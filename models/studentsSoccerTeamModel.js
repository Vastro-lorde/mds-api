const mongoose = require('mongoose')


const soccerPlayerSchema = new mongoose.Schema({
    player: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Student',
        required: [true]
    },
    shirtNumber: {
        type: Number,
        required: [true]
    },
    position: {
        type: String,
        required: [true]
    },
    isCaptain: {
        type: Boolean,
        required: true
    },
    availability: {
        type: Boolean,
        required: true
    }
})

const soccerTeamSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true
    },
    players: {
        type: [soccerPlayerSchema],
        required: true
    }
})

const SoccerPlayer = mongoose.Model("SoccerPlayer", soccerPlayerSchema)
const SoccerTeam = mongoose.Model("SoccerTeam", soccerTeamSchema)

module.exports = { SoccerPlayer, SoccerTeam }