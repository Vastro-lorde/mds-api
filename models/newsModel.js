// This is the model for the News.

// importing mongoose
const mongoose = require('mongoose');

// created the Schema for the News using .Schema() method in the mongoose class object creator that's why its mongoose.Schema.
const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: ['true', 'Title cannot be empty'],
    },
    picture: {
        type: String,
    },
    picture_cloudId: {
        type: String,
    },
    text: {
        type: String,
        required: ['true', 'Text cannot be empty'],
    },
    date: {
        type: String,
        required: ['true', 'Date cannot be empty'],
    }

});

// creates the News using the mongoose model() method which takes in the name of the model and the Schema(in our case staffSchema)
const News = mongoose.model('News', newsSchema);

// Exporting the News model.
module.exports = News;