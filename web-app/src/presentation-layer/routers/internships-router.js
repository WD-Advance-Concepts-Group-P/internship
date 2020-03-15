const express = require('express')
const router = express.Router()
const csurf = require('csurf')
const csrfProtection = csurf()

const container = require('../../main')
const internshipManager = container.resolve('internshipManager')
const profileManager = container.resolve('profileManager')
const authHelper = require('../../util/auth-helper')

router.route('/create-advert')
    .all(authHelper.isAuthenticated, csrfProtection)
    .get(function(request, response, next) {
        if (request.session.user.user_type === 1) {
            response.render('internship/create-advert-student.hbs', {csrfToken: request.csrfToken()})
        } else if (request.session.user.user_type === 2) {
            response.render('internship/create-advert-recruiter.hbs', {csrfToken: request.csrfToken(), website: 'https://'})
        } else {
            response.render('errors/error.hbs', {validationErrors: 'Application error'})
        }
    })
    .post(function(request, response, next) {
        if (request.session.user.user_type === 1) {  
            const values = {
                title: request.body.title, 
                body: request.body.body, 
                field: request.body.field, 
                contact: request.body.contact, 
                start_date: request.body.startdate, 
                end_date: request.body.enddate
            }

            internshipManager.createStudentAdvert(request.session.user, values, function(status, errorOrId) {
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
            const values = {
                title: request.body.title, 
                body: request.body.body, 
                field: request.body.field, 
                city: request.body.city, 
                website: request.body.website, 
                contact: request.body.contact, 
                positions: request.body.positions, 
                deadline_date: request.body.deadline_date
            }
            internshipManager.createRecruiterAdvert(request.session.user, values, function(status, errorOrId) {
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
            response.render('errors/error.hbs', {validationErrors: 'Application error'})
        } 
    })

router.get('/student-adverts', function(request, response) {
    internshipManager.getALlStudentAdverts(function(status, advert) {
        if (status) {
            var model = {
                sendMessageHidden: true,
                Posts: advert,
            }
    
            response.render("internship/student-adverts.hbs", model)
        } else {
            response.render('errors/error.hbs', {validationErrors: 'Application error'})
        }
    })
})

router.get('/positions', function(request, response) {
    internshipManager.getALlRecruiterAdverts(function(status, adverts) {
        if (status) {
            var model = {
                sendMessageHidden: true,
                Posts: adverts,
            }
    
            response.render("internship/recruiter-adverts.hbs", model)
        } else {
            response.render('errors/error.hbs', {validationErrors: 'Application error'})
        }
    })
})

router.get('/my/adverts', authHelper.isAuthenticated, csrfProtection, function(request, response) {
    internshipManager.getAllAdvertsByUser(request.session.user.id, request.session.user.user_type, function(status, adverts) {
        if (status) {
            var model = {
                searchBarHidden: true,
                sendMessageHidden: true,
                hideGotoAdvertLink: true,
                csrfToken: request.csrfToken(),
                deleteOrUpdate: true,
                Posts: adverts,
            }
            if (request.session.user.user_type === 1) {
                response.render("internship/student-adverts.hbs", model)
            } else if (request.session.user.user_type === 2) {
                response.render("internship/recruiter-adverts.hbs", model)
            } else {
                response.render('errors/error.hbs', {validationErrors: 'Application error'})
            }
        } else {
            response.render('errors/error.hbs', {validationErrors: 'Application error'})
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
                        response.render('errors/error.hbs', {validationErrors: 'Could not find any advert'})
                    } else {
                        var model
                        if (request.session.user && request.session.user.id == advertsOrError.posted_by) {
                            model = {
                                csrfToken: request.csrfToken(),
                                Post: advertsOrError,
                                sendMessageHidden: true
                            }
                        } else {
                            model = {
                                csrfToken: request.csrfToken(),
                                Post: advertsOrError,
                            }
                        }
                        if (request.query.type == 'student') {
                            response.render("internship/student-advert.hbs", model)
                        } else if (request.query.type == 'recruiter') {
                            response.render("internship/recruiter-advert.hbs", model)
                        } else {
                            response.render('errors/error.hbs', {validationErrors: 'Application error'})
                        }
                    }
                } else {
                    response.render('errors/error.hbs', {validationErrors: advertsOrError})
                }
            })
        } else {
            response.render('errors/error.hbs', {validationErrors: 'Wrong type submitted'})
        }
    })

router.route('/delete/advert')
    .all(authHelper.isAuthenticated, csrfProtection)
    .post(function(request, response, next) {
        internshipManager.deleteAdvert(request.body.id, request.session.user, function(status, error) {
            if (status) {
                response.redirect('/my/adverts')
            } else {
                response.render('errors/error.hbs', {validationErrors: error, errorCode: '500'})
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
                    response.render('errors/error.hbs', {validationErrors: 'You don\'t have access to this feature'})
                }
            } else {
                if (errorOrAdvert.includes('No advert')) {
                    response.render('errors/error.hbs', {validationErrors: errorOrAdvert, errorCode: '404 could not find the resource'})
                } else {
                    response.render('errors/error.hbs', {errorCode: '500 server error'})
                }
            }
        })
    })
    .post(function(request, response, next) {
        if (request.session.user.user_type === 1 && request.query.type === 'student') {
            const values = {
                title: request.body.title, 
                body: request.body.body, 
                field: request.body.field, 
                contact: request.body.contact, 
                start_date: request.body.startdate, 
                end_date: request.body.enddate
            }
            internshipManager.updateStudentAdvert(request.session.user, request.query.id, values, function(status, errorOrId) {
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
            const values = {
                title: request.body.title, 
                body: request.body.body, 
                field: request.body.field, 
                city: request.body.city, 
                website: request.body.website, 
                contact: request.body.contact, 
                positions: request.body.positions, 
                deadline_date: request.body.deadline_date
            }
            internshipManager.updateRecruiterAdvert(request.session.user, request.query.id, values, function(status, errorOrId) {
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
            response.render('errors/error.hbs', {validationErrors: 'Wrong type submitted (student or recruiter) allowed'})
        }
    })

router.get('/creator/:id', function(request, response) {
    var user_type
    if (request.query.type == 'student') {
        user_type = 1
    } else if (request.query.type == 'recruiter') {
        user_type = 2
    } else {
        return response.render('errors/error.hbs', {validationErrors: 'Invalid user type submitted (student/recruiter)'})
    }

    const user = {
        user_type: user_type,
        id: request.params.id
    }
    profileManager.getUserInfo(user, function(status, infoOrError) {
        if (status) {
            if (user_type == 1) {
                const model = {
                    student: true,
                    info: infoOrError 
                }
                response.render('profile/creator.hbs', model)
            } else if (user_type == 2) {
                const model = {
                    student: false,
                    info: infoOrError 
                }
                console.log(infoOrError)
                response.render('profile/creator.hbs', model)
            }
        } else {
            response.render('errors/error.hbs', {validationErrors: 'No user info'})
        }
    })
})

module.exports = router