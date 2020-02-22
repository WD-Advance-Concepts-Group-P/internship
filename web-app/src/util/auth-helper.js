const jwt = require('jsonwebtoken');

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

exports.apiIsAuthenticated = function (request, response, next) {
    if (request.body.token) {
        jwt.verify(request.body.token, '&/yde465hw3dk.fwjbq84fv34763t6', function(error, decoded) {
            if (error) {
                console.log(error)
                return response.json({
                    'status': '401',
                    'error': 'your not logged in',
                    'code': 'AUTH_1'
                })
            } else {
                return next();
            }
        })
    } else {
        return response.json({
            'status': '401',
            'error': 'your not logged in',
            'code': 'AUTH_1'
        })
    }
}