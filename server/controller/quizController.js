const Quiz = require('../models/quiz');

//GET ALL
module.exports.getAllQuizes = async (req, res) => {
    try {
        const quizes = await Quiz.find({}, {}, { sort: { date: -1 } }).skip(req.skipIndex).limit(req.limit);
        res.status(200).json({ quizes });
    }
    catch (err) {
        res.status(500).json({ msg: err });
    }
}

//GET BY IP
module.exports.getQuizById = async (req, res) => {
    try {
        const quiz = await Quiz.findOne({ id: req.params.id });
        res.status(200).json({ quiz });
    }
    catch (err) {
        res.status(500).json({ msg: err });
    }
}

//GET FAVORITES
module.exports.getQuizesByIds = async (req, res) => {
    try {
        const ids = JSON.parse(req.params.ids);
        const quizes = await Quiz.find({ id: { $in: ids } }).skip(req.skipIndex).limit(req.limit);
        res.status(200).json({ quizes });
    }
    catch (err) {
        res.status(500).json({ msg: err });
    }
}

//GET BY AUTHOR
module.exports.getQuizesByAuthor = async (req, res) => {
    try {
        const quizes = await Quiz.find({ author: req.params.id }, {}, { sort: { date: -1 } }).skip(req.skipIndex).limit(req.limit);
        res.status(200).json({ quizes });
    }
    catch (err) {
        res.status(500).json({ msg: err });
    }
}

//GET BY TAGS
module.exports.getQuizesByTags = async (req, res) => {
    try {
        const tags = JSON.parse(req.params.ids);
        const quizes = await Quiz.find({ tags: { $in: tags } }).skip(req.skipIndex).limit(req.limit);
        res.status(200).json({ quizes });
    }
    catch (err) {
        res.status(500).json({ msg: err });
    }
}

//UPDATE BY ID
module.exports.updateQuizById = async (req, res) => {
    try {
        const quiz = await Quiz.updateOne({ id: req.params.id }, { $set: req.body });
        res.status(200).json({ quiz });
    }
    catch (err) {
        res.status(500).json({ msg: err });
    }
}

//ADD
module.exports.addQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.create({ ...req.body, author: req.user.id });
        res.status(201).json({ quiz });
    }
    catch (err) {
        res.status(500).json({ msg: err });
    }
}

//DELETE BY ID
module.exports.deleteQuizById = async (req, res) => {
    try {
        const quiz = await Quiz.deleteOne({ id: req.params.id });
        res.status(201).json({ quiz });
    }
    catch (err) {
        res.status(500).json({ msg: err });
    }
}