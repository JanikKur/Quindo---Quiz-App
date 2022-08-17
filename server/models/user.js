const mongoose = require('mongoose');
const uuid = require('uuid');

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        default: uuid.v4()
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        select: false 
    },
    profileImage: {
        type: String,
        required: true,
        default: '/images/standardUser.png'
    },
    favourites:[{
        type: String,
        required: false,
        trim: true
    }]
});

module.exports = mongoose.model('User', UserSchema);