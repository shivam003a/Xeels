const mongoose = require('mongoose');

const pinSchema = new mongoose.Schema({
    pin: {
        type: String,
        required: true,
        minLength: 4
    },
    uid: {
        type: String,
        required: true,
        default: "admin@xeels.com",
        unique: true
    }
}, { timestamps: true})

const Pin = mongoose.model('Pin', pinSchema);

module.exports = Pin;