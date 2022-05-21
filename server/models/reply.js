const Question = require('./question');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const replySchema = new Schema({
    body: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    questionID: {
        type: Schema.Types.ObjectId,
        path: 'Question',
        required: true
    }
});

module.exports = mongoose.model("Reply", replySchema);