exports.isAuthenticated = function (request, response, next) {
    if (request.session.authenticated && request.session.user != null) {
        return next();
    }
    response.redirect('/login')
}

exports.alreadyAuthenticated = function(request, response, next) {
    if (request.session.authenticated && request.session.user != null) {
        return response.redirect('/profile')
    } else {
        return next();
    }
}