const joi = require('joi');
const Place = require('./place');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    cleanRating: joi.number().required().min(1).max(5),
    speedRating: joi.number().required().min(1).max(5),
    serviceRating: joi.number().required().min(1).max(5),
    date: {
        type: String,
        required: true
    },
    vote: {
        type: Number,
        required: true
    },
    report: {
        type: Number,
        required: true
    },
    rate: joi.number().required().min(1).max(5),
    placeID: {
        type: Schema.Types.ObjectId,
        path: 'Place',
        required: true
    }
});

module.exports = Review = mongoose.model("Review", reviewSchema);