const checkAuth = function(req, res, next) {
    if(req.session && req.session.isLogin){
        next();
    } else {
        req.flash('error', 'You must be logged in');
        res.redirect('/login');
    }
}

module.exports = checkAuth;