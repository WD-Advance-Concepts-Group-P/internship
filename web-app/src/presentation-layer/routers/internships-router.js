const express = require('express')
const router = express.Router()
const csurf = require('csurf')

const csrfProtection = csurf()
const internshipManager = require('../../business-logic-layer/internship-manager')
const authHelper = require('../../util/auth-helper')

router.route('/create-advert')
    .all(authHelper.isAuthenticated, csrfProtection)
    .get(function(request, response, next) {
        if (request.session.user.user_type === 1) {
            response.render('internship/create-advert-student.hbs', {csrfToken: request.csrfToken()})
        } else if (request.session.user.user_type === 2) {
            response.render('internship/create-advert-recruiter.hbs', {csrfToken: request.csrfToken()})
        } else {
            response.send('server error')
        }
    })
    .post(function(request, response, next) {
        if (request.session.user.user_type === 1) {  
            console.log(request.body)
            internshipManager.createStudentAdvert(request.session.user, request.body.title, request.body.body, request.body.field, request.body.contact, request.body.startdate, request.body.enddate, function(status, errorOrId) {
                if (status) {
                    response.send('test' + errorOrId)
                } else {
                    response.send('no')
                }
            })

        } else if (request.session.user.user_type === 2) {
            console.log(request.body)
            internshipManager.createRecruiterAdvert(request.session.user, request.body.title, request.body.body, request.body.field, request.body.website, request.body.contact, request.body.positions, request.body.deadline_date, function(status, errorOrId) {
                if (status) {
                    response.send('test' + errorOrId)
                } else {
                    response.send('no')
                }
            })

        } else {
            response.send('server error')
        } 
    })

router.get('/student-adverts', function(request, response) {
    internshipManager.getALlStudentAdverts(function(status, errorOrAdverts) {
        if (status) {
            var model = {
                Posts: errorOrAdverts,
            }
    
            response.render("internship/student-adverts.hbs", model)
        } else {
            response.send('error')
        }
    })
})

router.get('/positions', function(request, response) {
    internshipManager.getALlRecruiterAdverts(function(status, errorOrAdverts) {
        if (status) {
            var model = {
                Posts: errorOrAdverts,
            }
    
            response.render("internship/recruiter-adverts.hbs", model)
        } else {
            response.send('error')
        }
    })
})
    
module.exports = router