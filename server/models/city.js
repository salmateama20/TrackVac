const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    places: {
        type: [Schema.Types.ObjectId],
        required: true,
        ref: 'Place'
    }
});

module.exports = mongoose.model("City", citySchema);