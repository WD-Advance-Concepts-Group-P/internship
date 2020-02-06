const express = require('express')
const router = express.Router()
const csurf = require('csurf')

const csrfProtection = csurf()
const profileManager = require('../../business-logic-layer/profile-manager')

router.get('/', function(request, response) {
    response.render('dashboard.hbs')
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