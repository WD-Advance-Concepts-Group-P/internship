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
                    response.send('test ' + errorOrId)
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

router.get('/my/adverts', authHelper.isAuthenticated, csrfProtection, function(request, response) {
    internshipManager.getAllAdvertsByUser(request.session.user.id, request.session.user.user_type, function(status, errorOrAdverts) {
        if (status) {
            var model = {
                csrfToken: request.csrfToken(),
                deleteOrUpdate: true,
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
        internshipManager.deleteAdvert(request.body.id, request.session.user, function(status, error) {
            if (status) {
                response.redirect('/my/adverts')
            } else {
                console.log(error)
                response.send('error')
            }
        })
    })

router.route('/update/advert')
    .all(authHelper.isAuthenticated, csrfProtection)
    .get(function(request, response, next) {

        internshipManager.getAdvertById(request.query.id, request.query.type, function(status, errorOrAdvert) {
            if (status) {
                if (request.session.user.user_type === 1 && request.query.type === 'student') {
                    const model = {
                        csrfToken: request.csrfToken(),
                        title: errorOrAdvert.title,
                        body: errorOrAdvert.body,
                        field: errorOrAdvert.field,
                        contact: errorOrAdvert.contact,
                        startdate: errorOrAdvert.startdate,
                        enddate: errorOrAdvert.enddate,
                    }
                    response.render('internship/create-advert-student.hbs', model)
                } else if (request.session.user.user_type === 2 && request.query.type === 'recruiter') {
                    const model = {
                        csrfToken: request.csrfToken(),
                        title: errorOrAdvert.title,
                        body: errorOrAdvert.body,
                        field: errorOrAdvert.field,
                        city: errorOrAdvert.city,
                        contact: errorOrAdvert.contact,
                        website: errorOrAdvert.website,
                        positions: errorOrAdvert.positions,
                        deadline_date: errorOrAdvert.deadline_date
                    }
                    response.render('internship/create-advert-recruiter.hbs', model)
                } else {
                    response.send('server error')
                }
            } else {
                response.send('You don\'t have access to this feature')
            }
        })
    })
    .post(function(request, response, next) {
        if (request.session.user.user_type === 1 && request.query.type === 'student') {

            internshipManager.updateStudentAdvert(request.session.user, request.query.id, request.body.title, request.body.body, request.body.field, request.body.contact, request.body.startdate, request.body.enddate, function(status, errorOrId) {
                if (status) {
                    response.redirect('/my/adverts')
                } else {
                    response.send('server error')
                }
            })

        } else if (request.session.user.user_type === 2 && request.query.type === 'recruiter') {
            
            internshipManager.updateRecruiterAdvert(request.session.user, request.query.id, request.body.title, request.body.body, request.body.field, request.body.city, request.body.website, request.body.contact, request.body.positions, request.body.deadline_date, function(status, errorOrId) {
                if (status) {
                    response.redirect('/my/adverts')
                } else {
                    response.send('server error')
                }
            })

        } else {
            response.send('server error')
        }
    })

    
module.exports = router