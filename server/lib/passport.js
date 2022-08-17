const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtCookieComboStrategy = require('passport-jwt-cookiecombo');
const User = require('../models/user');
const { comparePasswords } = require('../utils/comparePasswords');

passport.use(new JwtCookieComboStrategy({
    secretOrPublicKey: process.env.AUTHENTICATION_SECRET
}, (payload, done) => {
    return done(null, payload.user);
}));

passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({email: username}).select('+password').exec((err, user) => {
            if(err) return done(err);
            if (!user) { return done(null, false); }
            comparePasswords(password, user.password).then(() => {
                done(null, user);
            }).catch(() => {
                done(null, false);
            });
        });
    }
));

module.exports = passport;