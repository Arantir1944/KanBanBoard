const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user'); // Import your User model

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, (username, password, done) => {
    User.findOne({ where: { username } })
        .then((user) => {
            if (!user || !user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect username or password' });
            }
            return done(null, user);
        })
        .catch((err) => done(err));
}));


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findByPk(id)
        .then((user) => {
            done(null, user);
        })
        .catch((err) => done(err));
});

module.exports = passport;
