const express = require('express');
const pagination = require('../utils/pagination');
const {getAllQuizes, getQuizById, getQuizesByIds, getQuizesByAuthor, getQuizesByTags, updateQuizById, addQuiz, deleteQuizById} = require('../controller/quizController');
const saveFile = require('../utils/saveFile');
const validateUserToken = require('../utils/validateUserToken');
const {isQuizAuthor} = require('../utils/isQuizAuthor');

const router = express.Router();

//GET ALL
router.get('/', pagination, getAllQuizes);

//GET BY ID
router.get('/id/:id', getQuizById);

//GET BY IDS
router.get('/ids/:ids', pagination, getQuizesByIds);

//GET BY AUTHOR
router.get('/author/:author', pagination, getQuizesByAuthor);

//GET BY TAGS
router.get('/tags/:tags', pagination, getQuizesByTags);

//UPDATE BY ID
router.put('/:id', [validateUserToken, isQuizAuthor], updateQuizById);

//ADD
router.post('/', [validateUserToken, saveFile], addQuiz);

//DELETE BY ID
router.delete('/:id', [validateUserToken, isQuizAuthor], deleteQuizById);

module.exports = router;