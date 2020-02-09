const express = require('express')
const router = express.Router()
const csurf = require('csurf')

const csrfProtection = csurf()
const profileManager = require('../../business-logic-layer/profile-manager')
const authHelper = require('../../util/auth-helper')

router.get('/', authHelper.isAuthenticated, function(request, response) {
    console.log(request.session.user)
    const model = {
        user: request.session.user.username
    }
    response.render('dashboard.hbs', model)
})

router.route('/setup')
    .all(authHelper.isAuthenticated, function(request, response, next) {
        if (request.session.user.seen === 1) {
            response.redirect('/profile')
        } else {
            next()
        }
    })
    .get(csrfProtection, function(request, response, next) {
        if (request.session.user.user_type === 1) {
            response.render('profile/student-info.hbs', {csrfToken: request.csrfToken()})
        } else if (request.session.user.user_type === 2) {
            response.render('profile/recruiter-info.hbs', {csrfToken: request.csrfToken()})
        } else {
            response.send('server error')
        }
    })
    .post(csrfProtection, function(request, response, next) {
        if (request.session.user.user_type === 1) {
            profileManager.createStudentInfo(request.session.user.id, 'test', 'tester', new Date(), 'test', null, null, null, null, null, function(status, error) {
                if (status) {
                    response.send('yes')
                } else {
                    response.send('no')
                }
            })
        } else if (request.session.user.user_type === 2) {
            profileManager.createRecruiterInfo(request.session.user.id, 'bla', 'sjsjs', 'Test AB', null, null, function(status, error) {
                if (status) {
                    response.send('yes')
                } else {
                    response.send('no')
                }
            })
        } else {
            response.send('server error')
        } 
    })

router.route('/update/studentInfo')
    .get(csrfProtection, function(request, response, next) {
        response.render('profile/student-info.hbs', {csrfToken: request.csrfToken()})
    })
    .post(csrfProtection, function(request, response, next) {
        
        profileManager.createStudentInfo(1, 'test', 'tester', new Date(), 'test', null, null, null, null, null, function(status, error) {
            if (status) {
                response.send('yes')
            } else {
                response.send('no')
            }
        })
    })

router.route('/update/recruiterInfo')
    .get(csrfProtection, function(request, response, next) {
        response.render('profile/recruiter-info.hbs', {csrfToken: request.csrfToken()})
    })
    .post(csrfProtection, function(request, response, next) {
        
        profileManager.createRecruiterInfo(1, 'bla', 'sjsjs', 'Test AB', null, null, function(status, error) {
            if (status) {
                response.send('yes')
            } else {
                response.send('no')
            }
        })
    })

module.exports = router