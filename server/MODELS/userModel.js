const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    mobile: {
        type: String,
        required: true,
        unique : true
    },
    mail:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    interests: Array,
    language: {
        type: String,
        required: true
    },
    availablity: {
        type: Boolean,
        default : false
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true
    },
    role: {
        type: String,
        enum: ['client', 'helper'],
        required: true
    },
    coins: {
        type: Number,
        default: 0
    },
    tokens: {
        type: Number,
        default: 0
    },
    ratings: {
        type: Number,
        min: [0, 'Rating must be at least 0'],
        max: [5, 'Rating must be at most 5'],
        default: 0,
        required: true 
    },
    callCount: {
        type: Number,
        default: 0
    }
},{
    timestamps: true
})

module.exports = mongoose.model('user', userSchema);