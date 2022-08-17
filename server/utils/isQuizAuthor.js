const Quiz = require('../models/quiz');

module.exports.isQuizAuthor = async (req,res,next) => {
    const quizAuthor = await Quiz.findOne({id: req.params.id}, {author: 1});
    if(quizAuthor.author !== req.user.id){
        return res.sendStatus(401);
    }
    next();
}