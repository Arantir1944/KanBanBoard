
const crypto = require('crypto');
const User = require('../models/user'); // Import your User model
const passport = require('../config/passport-config')

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}


module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

module.exports.registerUser = async (req, res) => {
    const { FirstName, LastName, Email, username, password } = req.body;
    try {
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            req.flash('error', 'User with this username already exists.');
            return res.redirect('/register');
        }
        const salt = crypto.randomBytes(16).toString('hex');
        const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
        await User.create({
            FirstName,
            LastName,
            Email,
            username,
            password: hash,
            salt
        });
        res.redirect('/login');

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports.loginUser = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',  // Redirect to items page on successful login
        failureRedirect: '/login',  // Redirect to login page in case of failure
        failureFlash: true,          // Enable flash messages for failure
        successFlash: true           // Enable flash messages for success
    }, (err, user, info) => {
        if (err) {
            return next(err);
        }

        // Check if the authentication was successful
        if (!user) {
            // Authentication failed
            req.flash('error', 'Authentication failed')
            return res.redirect('/login');
        }

        // Authentication successful
        // Call the next middleware to log the user after the authentication process
        req.login(user, (err) => {
            if (err) {
                return next(err);
            }
            req.flash('success', 'Welcome back!')
            return res.redirect('/');
        });
    })(req, res, next);
};

// controllers/users.js

module.exports.logoutUser = async (req, res, next) => {
    req.logout(req.user, err => {
        if (err) return next(err);
        req.flash('success', "Goodbye!");
        res.redirect('/');
    });
}
