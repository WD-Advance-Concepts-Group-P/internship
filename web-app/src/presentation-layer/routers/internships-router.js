const express = require('express')
const router = express.Router()
const csurf = require('csurf')
const csrfProtection = csurf()

const container = require('../../main')
const internshipManager = container.resolve('internshipManager')
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
            internshipManager.createStudentAdvert(request.session.user, request.body.title, request.body.body, request.body.field, request.body.contact, request.body.startdate, request.body.enddate, function(status, errorOrId) {
                if (status) {
                    response.send('test' + errorOrId)
                } else {
                    response.send('no')
                }
            })

        } else if (request.session.user.user_type === 2) {
            internshipManager.createRecruiterAdvert(request.session.user, request.body.title, request.body.body, request.body.field, request.body.city, request.body.website, request.body.contact, request.body.positions, request.body.deadline_date, function(status, errorOrId) {
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

/*
router.get('/advert/:advert-type/:id', function(request, response) {
    internshipManager.getAdvertById(request.params.id, request.params.advert-type, function(status, errorOrAdvert) {
        if (status) {
            response.send(errorOrAdvert)
        } else {
            response.send('error')
        }
    })
})*/

router.get('/my/adverts', authHelper.isAuthenticated, function(request, response) {
    internshipManager.getAllAdvertsByUser(request.session.user.id, request.session.user.user_type, function(status, errorOrAdverts) {
        if (status) {
            var model = {
                Posts: errorOrAdverts,
            }
            if (request.session.user.user_type === 1) {
                response.render("internship/student-adverts.hbs", model)
            } else if (request.session.user.user_type === 2) {
                response.render("internship/recruiter-adverts.hbs", model)
            } else {
                response.send('error')
            }
        } else {
            response.send('error')
        }
    })
})

router.route('/delete/advert')
    .all(authHelper.isAuthenticated, csrfProtection)
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

    
module.exports = router