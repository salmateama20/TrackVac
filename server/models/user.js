const mongoose = require('mongoose');
const joi = require('joi');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    vacID: joi.string().required().min(20).max(20),
    nationalID: joi.string().required().min(4).max(4),
    firstDose: {
        type: Boolean,
        required: true
    },
    secondDose: {
        type: Boolean,
        required: true
    },
    thirdDose: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model("User", userSchema);