const mongoose = require('mongoose');
const uuid = require('uuid');

const QuizSchema = new mongoose.Schema({

    id: {
        type: String,
        required: true,
        default: uuid.v4(),
    },
    category: {
        type: String,
        required: true
    },
    tags: [{
        type: String,
        required: false,
        trim: true
    }],
    visibility:{
        type: String,
        required: false,
        default: 'public'
    },
    author:{
        type: String,
        required: true
    },
    titleImage:{
        type: String,
        required: true
    },
    plays: {
        type: Number,
        required: false,
        default: 0
    },
    questions: {
        type: Array,
        required: true,
        default: []
    },
    title:{
        type: String,
        required: true
    },
    date: {
        type: Number,
        required: true,
        default: new Date().getTime()
    }

});

module.exports = mongoose.model('Quiz', QuizSchema);