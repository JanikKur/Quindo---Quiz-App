const User = require('../models/user');
const { hashPassword } = require('../utils/hashPassword');
const jwt = require('jsonwebtoken');
const { comparePasswords } = require('../utils/comparePasswords');

//GET BY ID
module.exports.getUserById = async (req, res) => {
    try {
        const user = await User.findOne({ id: req.params.id });
        res.status(200).json({ user });
    }
    catch (err) {
        res.status(500).json({ msg: err });
    }
}

//GET FAVOURITES
module.exports.getFavorites = async (req, res) => {
    try {
        const user = await User.findOne({ id: req.user.id }, {favourites: 1});
        res.status(200).json({ user });
    }
    catch (err) {
        res.status(500).json({ msg: err });
    }
}

//ADD USER
module.exports.addUser = async (req, res) => {
    try {
        let hashedPassword = await hashPassword(req.body.password);
        const user = await User.create({...req.body, password: hashedPassword});
        res.status(201).json({ user });
    }
    catch (err) {
        res.status(500).json({ msg: err });
    }
}

//LOGIN
module.exports.loginUser = async (req, res) => {
    jwt.sign({ user: req.user }, process.env.AUTHENTICATION_SECRET, (err, token) => {
        if (err) return res.json(err);
        // Send Set-Cookie header
        res.cookie('jwt', token, {
            httpOnly: true,
            sameSite: 'none',
            secure: true
        });

        delete req.user.password
        res.send(req.user);
        // Return json web token
        return res.json({
            jwt: token
        });
    });
}

//UPDATE BY ID
module.exports.updateUserById = async (req, res) => {
    if(req.params.id !== req.user.id) return res.sendStatus(401); //Check if user to update is also logged in user
    try {
        let user = null;
        if(req.body.oldPassword && req.body.password){ //Update Password
            const userPassword = await User.findOne({ id: req.user.id}, {password: 1});
            try{
                await comparePasswords(req.body.oldPassword, userPassword.password);
                const newPassword = await hashPassword(req.body.password);
                user = await User.updateOne({ id: req.params.id }, { $set: {...req.body, profileImage: req.body.fileLinks[0], password: newPassword} });
            }catch(err){
                return res.status(400).json({ err });
            }
        }
        else{
            req.body.password && delete req.body.password;
            user = await User.updateOne({ id: req.params.id }, { $set: {...req.body,  profileImage: req.body.fileLinks[0]} });
        }
        
        res.status(200).json({ user });
    }
    catch (err) {
        res.status(500).json({ msg: err });
    }
}

//FAVORIZE
module.exports.favorizeQuiz = async (req, res) => {
    try {
        const user = await User.updateOne({ id: req.user.id }, { $addToSet: {favorites: req.params.id} });
        res.status(200).json({ user });
    }
    catch (err) {
        res.status(500).json({ msg: err });
    }
}

//UNFAVORIZE
module.exports.unfavorizeQuiz = async (req, res) => {
    try {
        const user = await User.updateOne({ id: req.user.id }, { $pull: {favorites: req.params.id} });
        res.status(200).json({ user });
    }
    catch (err) {
        res.status(500).json({ msg: err });
    }
}

//VALIDATE
module.exports.validate = async (req, res) => {
    try {
        const user = await User.findOne({ id: req.user.id });
        res.status(200).json({ user });
    }
    catch (err) {
        res.status(500).json({ msg: err });
    }
}

//LOGOUT
module.exports.logout = async (req, res) => {
    if(req.cookies['jwt']){
        res.clearCookie('jwt')
        res.sendStatus(200)
    }
}

//DELETE BY ID
module.exports.deleteUser = async (req, res) => {
    if(req.params.id !== req.user.id) return res.sendStatus(401); //Check if user to delete is also logged in user
    try {
        const user = await User.deleteOne({ id: req.params.id });
        res.status(200).json({ user });
    }
    catch (err) {
        res.status(500).json({ msg: err });
    }
}