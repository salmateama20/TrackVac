const Place = require('./place');
const Reply = require('./reply');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    vote: {
        type: Number,
        required: true
    },
    replies: {
        type: [Schema.Types.ObjectId],
        ref: 'Reply'
    },
    placeID: {
        type: Schema.Types.ObjectId,
        path: 'Place',
        required: true
    }
});

module.exports = mongoose.model("Question", questionSchema);