const jwt = require('jsonwebtoken');

module.exports = function validateUserToken(req, res, next) {
    const token = req.cookies.jwt;
    jwt.verify(token, process.env.AUTHENTICATION_SECRET, (err, result) => {
        if(result){
            req.user = result.user;
            next();
        }
        else{
            res.sendStatus(401);
        }
    });
}