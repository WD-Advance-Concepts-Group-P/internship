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
        //get user info
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
                response.json({
                    'error': 'true',
                    'message': errorOrInfo,
                    'code': 'APP_ERR'
                })
            }
        })
    })
    .post(function(request, response, next) {
        //create user info
        if (response.locals.userType === 1) {
            profileManager.createStudentInfo(response.locals.uid, request.body.firstname, request.body.lastname, request.body.birthdate, request.body.bio, request.body.school, request.body.program, request.body.graduationdate, request.body.resume, request.body.profilepic, function(status, error) {
                if (status) {
                    request.session.user.seen = 1
                    response.redirect('/profile')
                } else {
                    response.json({
                        'error': 'true',
                        'message': error,
                        'code': 'APP_ERR'
                    })
                }
            })
        } else if (response.locals.userType === 2) {
            profileManager.createRecruiterInfo(response.locals.uid, request.body.firstname, request.body.lastname, request.body.companyname, request.body.phonenumber, request.body.companylogo, function(status, error) {
                if (status) {
                    request.session.user.seen = 1
                    response.redirect('/profile')
                } else {
                    response.json({
                        'error': 'true',
                        'message': error,
                        'code': 'APP_ERR'
                    })
                }
            })
        } else {
            response.json({
                'error': 'true',
                'message': 'wrong user type',
                'code': 'APP_ERR'
            })
        }
    })
    .patch(function(request, response, next) {
        // update user info
        response.json({'test': 'fail'})
    })

module.exports = router