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
            response.render('internship/create-advert-recruiter.hbs', {csrfToken: request.csrfToken(), website: 'https://'})
        } else {
            response.render('errors/500.hbs')
        }
    })
    .post(function(request, response, next) {
        if (request.session.user.user_type === 1) {  
            internshipManager.createStudentAdvert(request.session.user, request.body.title, request.body.body, request.body.field, request.body.contact, request.body.startdate, request.body.enddate, function(status, errorOrId) {
                if (status) {
                    response.redirect('/my/adverts')
                } else {
                    var model = {
                        validationErrors: errorOrId,
                        title: request.body.title,
                        body: request.body.body,
                        field: request.body.field,
                        contact: request.body.contact,
                        startdate: request.body.startdate,
                        enddate: request.body.enddate,
                        csrfToken: request.csrfToken()
                    }
                    response.render('internship/create-advert-student.hbs', model)
                }
            })

        } else if (request.session.user.user_type === 2) {
            internshipManager.createRecruiterAdvert(request.session.user, request.body.title, request.body.body, request.body.field, request.body.city, request.body.website, request.body.contact, request.body.positions, request.body.deadline_date, function(status, errorOrId) {
                if (status) {
                    response.redirect('/my/adverts')
                } else {
                    var model = {
                        validationErrors: errorOrId,
                        title: request.body.title,
                        body: request.body.body,
                        field: request.body.field,
                        contact: request.body.contact,
                        city: request.body.city,
                        website: request.body.website,
                        positions: request.body.positions,
                        deadline_date: request.body.deadline_date,
                        csrfToken: request.csrfToken()
                    }
                    response.render('internship/create-advert-recruiter.hbs', model)
                }
            })

        } else {
            response.render('errors/500.hbs')
        } 
    })

router.get('/student-adverts', function(request, response) {
    internshipManager.getALlStudentAdverts(function(status, advert) {
        if (status) {
            var model = {
                Posts: advert,
            }
    
            response.render("internship/student-adverts.hbs", model)
        } else {
            response.render('errors/500.hbs')
        }
    })
})

router.get('/positions', function(request, response) {
    internshipManager.getALlRecruiterAdverts(function(status, adverts) {
        if (status) {
            var model = {
                Posts: adverts,
            }
    
            response.render("internship/recruiter-adverts.hbs", model)
        } else {
            response.render('errors/500.hbs')
        }
    })
})

router.get('/my/adverts', authHelper.isAuthenticated, csrfProtection, function(request, response) {
    internshipManager.getAllAdvertsByUser(request.session.user.id, request.session.user.user_type, function(status, adverts) {
        if (status) {
            var model = {
                csrfToken: request.csrfToken(),
                deleteOrUpdate: true,
                Posts: adverts,
            }
            if (request.session.user.user_type === 1) {
                response.render("internship/student-adverts.hbs", model)
            } else if (request.session.user.user_type === 2) {
                response.render("internship/recruiter-adverts.hbs", model)
            } else {
                response.render('errors/500.hbs')
            }
        } else {
            response.render('errors/500.hbs')
        }
    })
})

router.route('/advert/:id')
    .all(csrfProtection, function(request, response, next) {
        next()
    })
    .get(function(request, response, next) {
        if (request.query.type == 'student' || request.query.type == 'recruiter') {
            internshipManager.getAdvertById(request.params.id, request.query.type, function(status, advertsOrError) {
                if (status) {
                    if (advertsOrError == null) {
                        response.render('errors/404.hbs', {validationErrors: 'Could not find any advert'})
                    } else {
                        var model = {
                            csrfToken: request.csrfToken(),
                            Post: advertsOrError,
                        }
                        if (request.query.type == 'student') {
                            response.render("internship/student-advert.hbs", model)
                        } else if (request.query.type == 'recruiter') {
                            response.render("internship/recruiter-advert.hbs", model)
                        } else {
                            response.render('errors/500.hbs')
                        }
                    }
                } else {
                    response.render('errors/500.hbs', {validationErrors: advertsOrError})
                }
            })
        } else {
            response.render('errors/500.hbs', {validationErrors: 'Wrong type submitted'})
        }
    })

router.route('/delete/advert')
    .all(authHelper.isAuthenticated, csrfProtection)
    .post(function(request, response, next) {
        internshipManager.deleteAdvert(request.body.id, request.session.user, function(status, error) {
            if (status) {
                response.redirect('/my/adverts')
            } else {
                response.render('errors/500.hbs', {validationErrors: error})
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
                        startdate: errorOrAdvert.start_date,
                        enddate: errorOrAdvert.end_date
                    }
                    console.log(model)
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
                    response.render('errors/500.hbs', {validationErrors: 'You don\'t have access to this feature'})
                }
            } else {
                response.render('errors/500.hbs')
            }
        })
    })
    .post(function(request, response, next) {
        if (request.session.user.user_type === 1 && request.query.type === 'student') {
            internshipManager.updateStudentAdvert(request.session.user, request.query.id, request.body.title, request.body.body, request.body.field, request.body.contact, request.body.startdate, request.body.enddate, function(status, errorOrId) {
                if (status) {
                    response.redirect('/my/adverts')
                } else {
                    var model = {
                        validationErrors: errorOrId,
                        title: request.body.title,
                        body: request.body.body,
                        field: request.body.field,
                        contact: request.body.contact,
                        startdate: request.body.startdate,
                        enddate: request.body.enddate,
                        csrfToken: request.csrfToken()
                    }
                    response.render('internship/create-advert-student.hbs', model)
                }
            })
        } else if (request.session.user.user_type === 2 && request.query.type === 'recruiter') {
            internshipManager.updateRecruiterAdvert(request.session.user, request.query.id, request.body.title, request.body.body, request.body.field, request.body.city, request.body.website, request.body.contact, request.body.positions, request.body.deadline_date, function(status, errorOrId) {
                if (status) {
                    response.redirect('/my/adverts')
                } else {
                    var model = {
                        validationErrors: errorOrId,
                        title: request.body.title,
                        body: request.body.body,
                        field: request.body.field,
                        contact: request.body.contact,
                        city: request.body.city,
                        website: request.body.website,
                        positions: request.body.positions,
                        deadline_date: request.body.deadline_date,
                        csrfToken: request.csrfToken()
                    }
                    response.render('internship/create-advert-recruiter.hbs', model)
                }
            })
        } else {
            response.render('errors/500.hbs')
        }
    })
 
module.exports = router