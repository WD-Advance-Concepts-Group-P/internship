const express = require('express')
const router = express.Router()

// CSURF Protection
const csurf = require('csurf')
const csrfProtection = csurf()

// Awilix
const container = require('../../main')
const internshipManager = container.resolve('internshipManager')
const profileManager = container.resolve('profileManager')

// Express validator
const validator = require('../../util/validation')
const { validationResult } = require('express-validator')

// Authentication Utils
const authHelper = require('../../util/auth-helper')

const USER_TYPE_STUDENT = 1
const USER_TYPE_RECRUITER = 2


/**
 * URL /internships/create-advert
 */
router.route('/create-advert')
    .all(authHelper.isAuthenticated, csrfProtection)
    .get((request, response, next) => {
        if (request.session.user.user_type === USER_TYPE_STUDENT) {
            response.render('internship/create-advert-student.hbs', {csrfToken: request.csrfToken()})
        } else if (request.session.user.user_type === USER_TYPE_RECRUITER) {
            response.render('internship/create-advert-recruiter.hbs', {csrfToken: request.csrfToken(), website: 'https://'})
        } else {
            response.render('errors/error.hbs', {validationErrors: 'Application error'})
        }
    })

/**
 * URL POST /internships/create-student-advert
 */
router.post('/create-student-advert', authHelper.isAuthenticated, validator('studentAdvert'), csrfProtection, (request, response, next) => {

    const values = {
        title: request.body.title, 
        body: request.body.body, 
        field: request.body.field, 
        contact: request.body.contact, 
        start_date: request.body.startdate, 
        end_date: request.body.enddate
    }

    const errors = validationResult(request);

    if (!errors.isEmpty()) {

        console.log(errors)

        const model = {
            validation: errors,
            username,
            email,
            csrfToken: request.csrfToken(),
        }

        return response.render('internship/create-advert-student.hbs', model)
    }

    internshipManager.createAdvert(values, request.session.user)
        .then(() => response.redirect('/internships/adverts') )
        .catch(error => {
            return response.render('errors/error.hbs', {validationErrors: 'Database error please try again later', errorCode: 500})
        })
})

/**
 * POST
 * URL /internship/create-recruiter-advert
 */
router.post('/create-recruiter-advert', authHelper.isAuthenticated, validator('recruiterAdvert'), csrfProtection, (request, response, next) => {

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
    
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        const model = {
            validation: errors,
            username,
            email,
            csrfToken: request.csrfToken(),
        }

        return response.render('internship/create-advert-recruiter.hbs', model)
    }

    internshipManager.createAdvert(values, request.session.user)
        .then(() => response.redirect('/internships/adverts') )
        .catch(error => {
            return response.render('errors/error.hbs', {validationErrors: 'Database error please try again later', errorCode: 500})
        })
})


router.get('/student-adverts', function(request, response) {

    internshipManager.getAllAdverts(USER_TYPE_STUDENT)
        .then(adverts => {
            console.log(adverts)
            const model = {
                adverts: adverts
            }

            model.active =  { studentAdvert: true }

            response.render("internship/student-adverts.hbs", model)
        })
        .catch(error => {
            response.render('errors/error.hbs', {validationErrors: 'Application error'})
        })
})

router.get('/recruiter-adverts', function(request, response) {

    internshipManager.getAllAdverts(USER_TYPE_RECRUITER)
        .then(adverts => {
            const model = {
                adverts: adverts
            }

            model.active =  { recruiterAdvert: true }

            console.log(model)

            response.render("internship/recruiter-adverts.hbs", model)
        })
        .catch(error => {
            response.render('errors/error.hbs', {validationErrors: 'Application error'})
        })
})

router.get('/adverts', authHelper.isAuthenticated, csrfProtection, function(request, response) {

    internshipManager.getAllAdvertsByUser(request.session.user)
        .then(adverts => {
            const model = {
                adverts: adverts,
                csrfToken: request.csrfToken()
            }

            switch(request.session.user.user_type) {
                case USER_TYPE_STUDENT:
                    response.render("internship/my-student-adverts.hbs", model)
                    break
                case USER_TYPE_RECRUITER:
                    response.render("internship/my-recruiter-adverts.hbs", model)
                    break
                default:
                    response.render('errors/error.hbs', {validationErrors: 'Application error'})
            }
        })
})

router.route('/advert/:id')
    .all(csrfProtection, function(request, response, next) {
        next()
    })
    .get((request, response, next) => {

        internshipManager.getAdvertById(request.params.id, request.query.type)
            .then(advert => {
                const model = {
                    advert: advert,
                    csrfToken: request.csrfToken()
                }

                switch(request.query.type) {
                    case 'student':
                        response.render("internship/student-advert.hbs", model)
                        break
                    case 'recruiter':
                        response.render("internship/recruiter-advert.hbs", model)
                        break
                }
            })
            .catch(error => {
                response.render('errors/error.hbs', {validationErrors: 'Database error please try again later', errorCode: 500})
            })
    })

router.route('/advert/delete')
    .all(authHelper.isAuthenticated, csrfProtection)
    .post((request, response, next) => {

        internshipManager.deleteAdvert(request.body.id, request.session.user)
            .then(() => {
                response.redirect('/internships/adverts')
            })
            .catch(error => {
                response.render('errors/error.hbs', {validationErrors: 'Database error please try again later', errorCode: 500})
            })
    })

router.route('/advert/:id/edit')
    .all(authHelper.isAuthenticated, csrfProtection)
    .get((request, response, next) => {

        internshipManager.getAdvertById(request.params.id, request.query.type)
            .then(advert => {

                let model = null

                switch(request.query.type) {
                    case 'student':
                                
                        model = {
                            id: advert.id,
                            title: advert.title,
                            body: advert.body,
                            field: advert.field,
                            contact: advert.contact,
                            start_date: advert.start_date,
                            enddate: advert.end_date,
                            csrfToken: request.csrfToken()
                        }
         
                        response.render('internship/edit-advert-student.hbs', model)

                        break
                    case 'recruiter':
                        model = {
                            id: advert.id,
                            title: advert.title,
                            body: advert.body,
                            field: advert.field,
                            city: advert.city,
                            contact: advert.contact,
                            website: advert.website,
                            positions: advert.positions,
                            deadline_date: advert.deadline_date,
                            csrfToken: request.csrfToken()
                        }

                        response.render('internship/edit-advert-recruiter.hbs', model)

                        break
                    default:
                        response.render('errors/error.hbs', {validationErrors: 'Database error please try again later', errorCode: 500})
                }
            })
    })



/**
 * URL POST /internships/create-student-advert
 */
router.post('/edit-student-advert', authHelper.isAuthenticated, validator('studentAdvert'), csrfProtection, (request, response, next) => {

    const values = {
        title: request.body.title, 
        body: request.body.body, 
        field: request.body.field, 
        contact: request.body.contact, 
        start_date: request.body.startdate, 
        end_date: request.body.enddate
    }

    const errors = validationResult(request);

    if (!errors.isEmpty()) {

        console.log(errors)

        const model = {
            validation: errors,
            username,
            email,
            csrfToken: request.csrfToken(),
        }

        return response.render('internship/edit-advert-student.hbs', model)
    }

    internshipManager.updateAdvert(request.session.user, values, request.body.id)
        .then(() => response.redirect('/internships/adverts') )
        .catch(error => {
            return response.render('errors/error.hbs', {validationErrors: 'Database error please try again later', errorCode: 500})
        })
})


/**
 * POST
 * URL /internship/edit-recruiter-advert
 */
router.post('/edit-recruiter-advert', authHelper.isAuthenticated, validator('recruiterAdvert'), csrfProtection, (request, response, next) => {

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
    
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        const model = {
            validation: errors,
            username,
            email,
            csrfToken: request.csrfToken(),
        }

        return response.render('internship/edit-advert-recruiter.hbs', model)
    }

    internshipManager.updateAdvert(request.session.user, values, request.body.id)
        .then(() => response.redirect('/internships/adverts') )
        .catch(error => {
            return response.render('errors/error.hbs', {validationErrors: 'Database error please try again later', errorCode: 500})
        })
})

/**
 * 
 */
router.get('/creator/:id', function(request, response) {

    let user_type = null

    switch(request.query.type) {
        case 'student':
            user_type = 1
            break
        case 'recruiter':
            user_type = 2
            break
        default:
            //error
    }

    let user = {
        user_type: user_type,
        id: request.params.id
    }


    profileManager.getUserInformation(user)
        .then(information => {
            if (user_type == 1) {
                const model = {
                    student: true,
                    info: information 
                }
                response.render('profile/creator.hbs', model)
            } else if (user_type == 2) {
                const model = {
                    student: false,
                    info: information 
                }
                response.render('profile/creator.hbs', model)
            }
        })
        .catch(error => {
            response.render('errors/error.hbs', {validationErrors: 'Database error please try again later', errorCode: 500})
        })
/*
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
    })*/
})

module.exports = router