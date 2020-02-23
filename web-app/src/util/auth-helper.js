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
    if (request.header('x-token')) {
        jwt.verify(request.header('x-token'), '&/yde465hw3dk.fwjbq84fv34763t6', function(error, decoded) {
            if (error) {
                console.log(error)
                return response.json({
                    'status': '401',
                    'error': 'your not logged in',
                    'code': 'AUTH_1'
                })
            } else {
                console.log(decoded)
                response.locals.uid = decoded.uid
                response.locals.userType = decoded.userType
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