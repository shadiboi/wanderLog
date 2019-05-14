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
    photo: '',
    location: {
        latitude: Number,
        longitude: Number    
    },
})

const Entries = mongoose.model('Entries', entriesSchema);

module.exports = Entries;