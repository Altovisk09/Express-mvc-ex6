function logged(req, res, next){
    if(req.session.user){
        res.redirect('/profile');
    }
    next()
};

module.exports = logged;

