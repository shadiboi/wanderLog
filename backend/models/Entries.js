const mongoose = require("mongoose");

const entriesSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true, 
        unique: false
    },
    date: {
        type: String, 
        required: true, 
        unique: false
    },
    description: String,
    photos: [],
    location: Number,
})

const Entries = mongoose.model('Entries', entriesSchema);

module.exports = Entries;