const mongoose = require('mongoose');

let animalSchema = mongoose.Schema({
    rfidNumber: {
        type: String,
        trim: true
    },
    species: {
        type: String,
        required: true,
        trim: true
    },
    race: {
        type: String,
        trim: true
    },
    height: {
        type: Number,
        required: true,
        trim: true
    },
    weight: {
        type: Number,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    receptionDate: {
        type: Date,
        required: true,
        trim: true
    },
    birthDate: {
        type: Date,
        trim: true
    }
},{ timestamps: { createdAt: 'created_at' }})

module.exports = mongoose.model('Animal', animalSchema);