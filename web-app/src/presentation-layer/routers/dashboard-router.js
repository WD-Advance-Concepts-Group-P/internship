const express = require('express')
const router = express.Router()

// CSURF Protection
const csurf = require('csurf')
const csrfProtection = csurf()

// Express validator
const validator = require('../../util/validation')
const { validationResult } = require('express-validator')

// Awilix
const container = require('../../main')
const profileManager = container.resolve('profileManager')

// Authentication Utils
const authHelper = require('../../util/auth-helper')

const USER_TYPE_STUDENT = 1
const USER_TYPE_RECRUITER = 2

/**
 * URL /dashboard
 */
router.get('/', authHelper.isAuthenticated, function(request, response) {
    const model = { user: request.session.user.username }
    response.render('profile/dashboard.hbs', model)
})

/**
 * URL /dashboard/setup
 */
router.all('/setup', authHelper.isAuthenticated, (request, response, next) => {
    if (request.session.user.seen === 1) {
        response.redirect('/dashboard')
    }

    next()
})

router.get('/setup', csrfProtection, (request, response, next) => {
    switch(request.session.user.user_type) {
        case USER_TYPE_STUDENT:
            response.render('profile/create-student-info.hbs', {csrfToken: request.csrfToken()})
            break
        case USER_TYPE_RECRUITER:
            response.render('profile/create-recruiter-info.hbs', {csrfToken: request.csrfToken()})
            break
        default:
            response.render('errors/error.hbs', {validationErrors: 'You don\'t have access to this feature'})
    }
})

/**
 * URL POST /dahsboard/edit-student
 */
router.post('/create-student', validator('studentInformation'), csrfProtection, (request, response, next) => {

    const values = {
        firstname: request.body.firstname, 
        lastname: request.body.lastname, 
        birthdate: request.body.birthdate, 
        bio: request.body.bio, 
        school: request.body.school, 
        program: request.body.program, 
        graduationdate: request.body.graduationdate, 
        resume: request.body.resume, 
        profilepic: request.body.profilepic
    }

    const errors = validationResult(request)

    if (!errors.isEmpty()) {
        const model = {
            validation: errors,
            csrfToken: request.csrfToken(),
        }

        return response.render('profile/create-student-info.hbs', model)
    }

    profileManager.createUserInformation(request.session.user, values)
        .then(() => {
            console.log("Nu du student")
            request.session.user.seen = 1
            response.redirect('/dashboard')
        })
        .catch(error => {
            console.log(error)
            response.render('errors/error.hbs', {validationErrors: 'Application error'})
        })
})

/**
 * URL POST /dashboard/edit-recruiter
 */     
router.post('/create-recruiter', validator('recruiterInformation'), csrfProtection, (request, response, next) => {

    const values = {
        firstname: request.body.firstname, 
        lastname: request.body.lastname, 
        companyname: request.body.companyname, 
        phonenumber: request.body.phonenumber, 
        compnaylogo: request.body.companylogo
    } 

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        const model = {
            validation: errors,
            csrfToken: request.csrfToken(),
        }

        return response.render('profile/create-recruiter-info.hbs', model)
    }

    profileManager.createUserInformation(request.session.user, values)
        .then(() => {
            request.session.user.seen = 1
            response.redirect('/dashboard')
        })
        .catch(error => {
            response.render('errors/error.hbs', {validationErrors: 'Application error'})
        })
 })

/**
 * URL /dashboard/edit
 */
router.route('/edit')
    .all(authHelper.isAuthenticated, (request, response, next) => {
        next();
    })
    .get(csrfProtection, (request, response, next) => {

        let model = null

        profileManager.getUserInformation(request.session.user)
            .then(information => {
                
                switch(request.session.user.user_type) {
                    case USER_TYPE_STUDENT:

                        model = {
                            firstname: information.first_name,
                            lastname: information.last_name,
                            birthdate: information.birth_date,
                            bio: information.biography_text,
                            school: information.school,
                            program: information.program,
                            graduationdate: information.graduation_year,
                            resume: information.resume_url,
                            profile_picture: information.profile_pic_url,
                            csrfToken: request.csrfToken()
                        }

                        response.render('profile/edit-student-info.hbs', model)
                        break
                    case USER_TYPE_RECRUITER:

                        model = {
                            firstname: information.first_name,
                            lastname: information.last_name,
                            companyname: information.company_name,
                            phonenumber: information.phone_number,
                            companylogo: information.company_logo_url,
                            csrfToken: request.csrfToken()
                        }

                        response.render('profile/edit-recruiter-info.hbs', model)
                        break
                    default:
                        response.render('errors/error.hbs', {validationErrors: 'You don\'t have access to this feature'})
                }


            })
            .catch(error => {
                console.log(error)
            })
    })

    router.post('/edit-student', validator('studentInformation'), csrfProtection, (request, response, next) => {

        const values = {
            firstname: request.body.firstname, 
            lastname: request.body.lastname, 
            birthdate: request.body.birthdate, 
            bio: request.body.bio, 
            school: request.body.school, 
            program: request.body.program, 
            graduationdate: request.body.graduationdate, 
            resume: request.body.resume, 
            profilepic: request.body.profilepic
        }
    
        const errors = validationResult(request);
    
        if (!errors.isEmpty()) {
            const model = {
                validation: errors,
                csrfToken: request.csrfToken(),
            }
    
            return response.render('profile/edit-student-info.hbs', model)
        }
    
        profileManager.updateUserInformation(request.session.user, values)
            .then(() => {
                response.redirect('/dashboard')
            })
            .catch(error => {
                console.log(error)
                response.render('errors/error.hbs', {validationErrors: 'Application error'})
            })
    })
    
/**
 * URL POST /dashboard/edit-recruiter
 */     
router.post('/edit-recruiter', validator('recruiterInformation'), csrfProtection, (request, response, next) => {

    const values = {
        firstname: request.body.firstname, 
        lastname: request.body.lastname, 
        companyname: request.body.companyname, 
        phonenumber: request.body.phonenumber, 
        compnaylogo: request.body.companylogo
    } 

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        const model = {
            validation: errors,
            csrfToken: request.csrfToken(),
        }

        return response.render('profile/edit-recruiter-info.hbs', model)
    }

    profileManager.updateUserInformation(request.session.user, values)
        .then(() => {
            request.session.user.seen = 1
            response.redirect('/dashboard')
        })
        .catch(error => {
            response.render('errors/error.hbs', {validationErrors: 'Application error'})
        })
    })

module.exports = router