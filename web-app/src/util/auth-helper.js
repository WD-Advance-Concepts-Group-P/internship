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
    if (request.header('Authorization')) {
        const authHeader = request.header('Authorization')
	    const token = authHeader.substr("Bearer ".length)
        jwt.verify(token, '&/yde465hw3dk.fwjbq84fv34763t6', function(error, decoded) {
            if (error) {
                console.log(error)
                return response.status(401).json({
                    'error': 'your not logged in',
                    'code': 'AUTH_1'
                })
            } else {
                response.locals.uid = decoded.uid
                response.locals.userType = decoded.userType
                return next();
            }
        })
    } else {
        return response.status(401).json({
            'error': 'your not logged in',
            'code': 'AUTH_1'
        })
    }
}