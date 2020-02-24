const express = require('express')
const router = express.Router()

const jwt = require('jsonwebtoken');
const container = require('../../main')
const authManager = container.resolve('authManager')

router.route('/login-sessions')
    .all(function(request, response, next) {
        next();
    })
    .get(function(request, response, next) {
        //show logged in sessions
        response.json({'test': 'hello'})
    })
    .post(function(request, response, next) {
        //login user

        authManager.login(request.body.username, request.body.password, function(status, errorOrUser) {
            if (status) {
                jwt.sign({ uid: errorOrUser.id, userType: errorOrUser.user_type }, '&/yde465hw3dk.fwjbq84fv34763t6', function(error, token) {
                    if (error) {
                        response.json({
                            'error': 'true',
                            'message': 'error with application, please try again later',
                            'code': 'AUTH_3'
                        })
                    } else {
                        if (errorOrUser.seen === 0) {
                            response.json({
                                "yes": "logged in",
                                'message': 'you must create user info',
                                'code': 'AUTH_2', 
                                'route': '/user/info',
                                'token': token
                            })
                        } else {
                            response.json({
                                "yes": "logged in",
                                'message': errorOrUser,
                                'token': token
                            })
                        }
                    }
                });
            } else {
                response.json({
                    'error': 'true',
                    'message': errorOrUser,
                    'code': 'AUTH_1'
                })
            }
        })

    })
    .delete(function(request, response, next) {
        //sign out

    })

router.route('/user')
    .all(function(request, response, next) {
        next();
    })
    .post(function(request, response, next) {
        //create new user
        const username = request.body.username
        const email = request.body.email
        const password = request.body.password
        const accountType = request.body.accountType

        authManager.register(username, email, password, accountType, function(status, errorOrUser) {
            if (status) {
                response.json({
                    'status': 'success',
                    'message': 'success creating the account',
                    'route': '/login-sessions'
                })
            } else {
                response.json({
                    'status': 'fail',
                    'code': 'AUTH_5',
                    'message': errorOrUser
                })
            }
        })
    })

module.exports = router