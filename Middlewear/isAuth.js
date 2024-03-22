// THIS FUNCTION IS USED WHEN SOMEONE TRIES TO ACCESS THE AUTHENTICATED PAGES WITHOUT LOGIN
module.exports = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        console.log('LOGIN TO ACCESS THIS PAGE');
        req.flash('error', 'Login To Access');
        req.flash('className', 'errorFlash');
        return res.redirect('/login');
    }
    next();
}

