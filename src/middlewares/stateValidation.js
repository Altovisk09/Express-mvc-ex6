function stateValidation(value) {
    return function(req, res, next) {
        req.session.state = value;
        next();
    }
}

module.exports = stateValidation;
