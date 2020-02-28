const express = require('express')
const router = express.Router()

const jwt = require('jsonwebtoken');
const container = require('../../main')
const authManager = container.resolve('authManager')

router.route('/token')
    .all(function(request, response, next) {
        next();
    })
    .post(function(request, response, next) {
        //login user
        const grantType = request.body.grant_type

        console.log(request.body)

        if (grantType == "password") {
            authManager.login(request.body.username, request.body.password, function(status, errorOrUser) {
                if (status) {
                    jwt.sign({ uid: errorOrUser.id, userType: errorOrUser.user_type }, process.env.JWT_TOKEN_AUTH, { expiresIn: '2h' }, function(error, token) {
                        if (error) {
                            response.status(500).json({
                                'error': 'APP_1',
                                'message': 'error with application, please try again later',
                            })
                        } else {
                            jwt.sign({ sub: errorOrUser.id, email: errorOrUser.email, nickname: errorOrUser.username }, process.env.JWT_TOKEN_ID, { expiresIn: '2h' }, function(error, idToken) {

                                if (errorOrUser.seen === 0) {
                                    response.status(200).json({
                                        'error': 'APP_2',
                                        'message': 'you must create user info',
                                        'route': '/user/info',
                                        'expires_in': '7200',
                                        'access_token': token,
                                        'id_token': idToken
                                    })
                                } else {
                                    response.status(200).json({
                                        'access_token': token,
                                        'expires_in': '7200',
                                        'id_token': idToken
                                    })
                                }

                            })
                        }
                    });
                } else {
                    response.status(400).json({
                        'error': 'invalid_client',
                        'message': errorOrUser,
                    })
                }
            })
        } else {
            response.status(400).json({
                'error': 'unsupported_grant_type'
            })
        }

    })

router.route('/users')
    .all(function(request, response, next) {
        next();
    })
    .post(function(request, response, next) {
        //create new user
        const username = request.body.username
        const email = request.body.email
        const password = request.body.password
        const accountType = request.body.accountType

        authManager.register(username, email, password, accountType, function(status, errorOrUserId) {
            if (status) {
                response.json({
                    'message': 'User created'
                })
            } else {
                response.status(500).json({
                    'status': 'fail',
                    'code': 'AUTH_5',
                    'message': errorOrUserId
                })
            }
        })
    })

module.exports = router