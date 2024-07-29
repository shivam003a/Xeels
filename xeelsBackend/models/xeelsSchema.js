const mongoose = require('mongoose')

const xeelsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    }
}, {timestapms: true})

const Xeels = mongoose.model("Xeels", xeelsSchema);

module.exports = Xeels;