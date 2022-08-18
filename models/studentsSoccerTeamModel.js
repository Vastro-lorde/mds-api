const mongoose = require('mongoose')
const { isEmail } = require("validator")


const soccerPlayerSchema = new mongoose.Schema({
    player: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Student',
        required: [true],
        unique: true
    },
    picture: {
        type: String,
    },
    age: {
        type: Number,
        required: true
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
        required: true,
        default: false
    },
    availability: {
        type: Boolean,
        required: true,
        default: true
    }
})

const soccerTeamSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true
    },
    logo: {
        type: String,
    },
    players: {
        type: [soccerPlayerSchema],
        required: true
    }
})

const SoccerPlayer = mongoose.Model("SoccerPlayer", soccerPlayerSchema)
const SoccerTeam = mongoose.Model("SoccerTeam", soccerTeamSchema)

module.exports = { SoccerPlayer, SoccerTeam }