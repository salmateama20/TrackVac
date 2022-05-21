const City = require('./city');
const Reply = require('./reply');
const Review = require('./review');
const Question = require('./question');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true
    },
    reviews: {
        type: [Schema.Types.ObjectId],
        ref: 'Review'
    },
    questions: {
        type: [Schema.Types.ObjectId],
        ref: 'Question'
    },
    cityID: {
        type: Schema.Types.ObjectId,
        path: 'City',
        required: true
    }
});

module.exports = Place = mongoose.model("Place", placeSchema);