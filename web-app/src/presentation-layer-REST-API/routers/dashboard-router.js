const express = require('express')
const router = express.Router()

const container = require('../../main')
const profileManager = container.resolve('profileManager')
const authHelper = require('../../util/auth-helper')

router.route('/users/info')
    .all(authHelper.apiIsAuthenticated, function(request, response, next) {
        next();
    })
    .get(function(request, response, next) {
        const user = { 
            id: response.locals.uid,
            user_type: response.locals.userType
        }
        profileManager.getUserInfo(user, function(status, errorOrInfo) {
            if (status) {
                response.json({
                    'error': 'false',
                    'info': errorOrInfo
                })
            } else {
                if (errorOrInfo.includes('db error')) {
                    response.status(500).json({
                        'error': 'true',
                        'message': errorOrInfo,
                        'code': 'APP_2'
                    })
                } else {
                    response.status(400).json({
                        'error': 'true',
                        'message': errorOrInfo,
                        'code': 'APP_2'
                    })
                }
            }
        })
    })
    .post(function(request, response, next) {
        if (response.locals.userType === 1) {
            const values = {
                firstname: request.body.firstname, 
                lastname: request.body.lastname, 
                birthdate: (request.body.birthdate ? request.body.birthdate : null),
                bio: (request.body.bio ? request.body.bio : null),
                school: (request.body.school ? request.body.school : null), 
                program: (request.body.program ? request.body.program : null),
                graduationdate: (request.body.graduationdate ? request.body.graduationdate : null),
                resume: (request.body.resume ? request.body.graduationdate : null),
                profilepic: (request.body.profilepic ? request.body.profilepic : null)
            }

            profileManager.createStudentInfo(response.locals.uid, values, function(status, error) {
                if (status) {
                    response.json({
                        'error': 'false',
                        'message': 'created',
                    })
                } else {
                    if (error.includes('db error')) {
                        response.status(500).json({
                            'error': 'true',
                            'message': error,
                            'code': 'APP_2'
                        })
                    } else {
                        response.status(400).json({
                            'error': 'true',
                            'message': error,
                            'code': 'APP_2'
                        })
                    }
                }
            })
        } else if (response.locals.userType === 2) {

            const values = {
                firstname: request.body.firstname, 
                lastname: request.body.lastname, 
                companyname: request.body.companyname,
                phonenumber: (request.body.phonenumber ? request.body.phonenumber : null),
                companylogo: (request.body.companylogo ? request.body.companylogo : null),
            }

            profileManager.createRecruiterInfo(response.locals.uid, values, function(status, error) {
                if (status) {
                    response.json({
                        'error': 'false',
                        'message': 'created',
                    })
                } else {
                    if (error.includes('db error')) {
                        response.status(500).json({
                            'error': 'true',
                            'message': error,
                            'code': 'APP_2'
                        })
                    } else {
                        response.status(400).json({
                            'error': 'true',
                            'message': error,
                            'code': 'APP_2'
                        })
                    }
                }
            })
        } else {
            response.status(400).json({
                'error': 'true',
                'message': 'wrong user type',
                'code': 'APP_ERR'
            })
        }
    })

module.exports = router