const isAuthenticated = (req, res, next) => {
    // Check if the user is authenticated
    if (req.isAuthenticated()) {
        // If authenticated, continue to the next middleware or route handler
        return next();
    }

    // If not authenticated, redirect to the login page or send an unauthorized response
    req.flash('error', 'You need to be logged in first!')
    res.redirect('/login'); // Adjust the path based on your authentication setup
};

module.exports = { isAuthenticated };