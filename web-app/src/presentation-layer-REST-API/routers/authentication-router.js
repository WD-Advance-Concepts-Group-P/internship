const express = require('express')
const router = express.Router()

const jwt = require('jsonwebtoken');
const container = require('../../main')
const authenticationManager = container.resolve('authManager')

const validator = require('../../util/validation')
const { validationResult } = require('express-validator')

router.route('/token')
    .all(function(request, response, next) {
        next();
    })
    .post(validator('login'), function(request, response, next) {
        //login user
        const grantType = request.body.grant_type

        if (grantType == "password") {

            const username = request.body.username
            const password = request.body.password
            
            const errors = validationResult(request);

            if (!errors.isEmpty()) {
                return response.status(400).json({
                    'error': 'invalid_client',
                    'message': 'Error',
                })
            }

            authenticationManager.login(username, password)
                .then(user => {
                    jwt.sign({ uid: user.id, userType: user.user_type }, process.env.JWT_TOKEN_AUTH, { expiresIn: '2h' }, function(error, token) {
                        if (error) {
                            response.status(500).json({
                                'error': 'APP_1',
                                'message': 'error with application, please try again later',
                            })
                        } else {
                            jwt.sign({ sub: user.id, email: user.email, nickname: user.username }, process.env.JWT_TOKEN_ID, { expiresIn: '2h' }, function(error, idToken) {

                                if (user.seen === 0) {
                                    response.status(200).json({
                                        'error': 'APP_2',
                                        'user_type': user.user_type,
                                        'message': 'you must create user info',
                                        'route': '/users/info',
                                        'expires_in': '7200',
                                        'access_token': token,
                                        'id_token': idToken
                                    })
                                } else {
                                    response.status(200).json({
                                        'access_token': token,
                                        'expires_in': '7200',
                                        'user_type': user.user_type,
                                        'id_token': idToken
                                    })
                                }

                            })
                        }
                    });
                })
                .catch(error => {
                    if (error.includes("db error")) {
                        response.status(500).json({
                            'error': 'Server error',
                            'message': 'Server Error',
                        })
                    } else {
                        response.status(400).json({
                            'error': 'invalid_client',
                            'message': 'Invalid username/password'
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

        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            response.status(400).json({
                'status': 'fail',
                'message': 'Validation error'
            })
        }

        authenticationManager.register(username, email, password, accountType)
            .then(() => {
                response.status(201).json({
                    'message': 'User created'
                })
            })
            .catch(error => { 
                if (error.includes("db error")) {
                    response.status(500).json({
                        'status': 'fail',
                        'code': 'AUTH_5',
                        'message': error
                    })
                } else {
                    response.status(400).json({
                        'status': 'fail',
                        'code': 'AUTH_5',
                        'message': error
                    })
                }
            })
    })

module.exports = router