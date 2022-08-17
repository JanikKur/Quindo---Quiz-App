const express = require('express');
const { getUserById, getFavorites, addUser, loginUser, updateUserById, favorizeQuiz, unfavorizeQuiz, validate, logout, deleteUser } = require('../controller/userController');
const passport = require('../lib/passport');
const saveFile = require('../utils/saveFile');
const validateUserToken = require('../utils/validateUserToken');



const router = express.Router();


//GET BY ID
router.get('/id/:id', getUserById);

//GET FAVOURITES
router.get('/favorites', getFavorites);

//ADD USER
router.post('/', saveFile, addUser);

//LOGIN
router.post('/login', passport.authenticate('local', {session: false}), loginUser);

//UPDATE BY ID
router.put('/id/:id', [validateUserToken, saveFile], updateUserById);

//FAVORIZE
router.put('/favorize/:id', validateUserToken, favorizeQuiz);

//UNFAVORIZE
router.put('/unfavorize/:id', validateUserToken, unfavorizeQuiz);

//VALIDATE
router.get('/validate', validateUserToken, validate);

//LOGOUT
router.delete('/logout', logout);

//LOGOUT
router.delete('/id/:id', validateUserToken, deleteUser);


module.exports = router;
