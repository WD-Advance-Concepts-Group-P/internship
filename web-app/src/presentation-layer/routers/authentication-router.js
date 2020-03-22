const express = require('express')
const router = express.Router()

// CSURF Protection
const csurf = require('csurf')
const csrfProtection = csurf()

// Awilix
const container = require('../../main')
const authenticationManager = container.resolve('authManager')

// Express validator
const validator = require('../../util/validation')
const { validationResult } = require('express-validator')

// Authentication Utils
const authHelper = require('../../util/auth-helper')

/**
 * URL /login
 */
router.route('/login')
    .all(authHelper.alreadyAuthenticated)
    .get(csrfProtection, (request, response, next) => {
        const urlStudent = authenticationManager.generateGoogleLogin(1)
        const urlRecruiter = authenticationManager.generateGoogleLogin(2)
        response.render('auth/login.hbs', {csrfToken: request.csrfToken(), googleUrlStudent: urlStudent, googleUrlRecruiter: urlRecruiter, active: { login: true }})
    })
    .post(csrfProtection, validator('login'), (request, response, next) => {

        const username = request.body.username
        const password = request.body.password
        
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            const model = {
                validation: errors,
                username,
                csrfToken: request.csrfToken(),
            }

            model.active = { login: true }

            return response.render('auth/login.hbs', model)
        }

        authenticationManager.login(username, password)
            .then(user => {
                request.session.authenticated = true
                request.session.user = user

                if (request.session.user.seen === 1)
                    response.redirect('/dashboard')
                else
                    response.redirect('/dashboard/setup')
            })
            .catch(error => {
                if (error.includes('db error')) {
                    response.render('errors/error.hbs', {validationErrors: 'Database error please try again later', errorCode: 500})
                } else {
                    const urlStudent = authenticationManager.generateGoogleLogin(1)
                    const urlRecruiter = authenticationManager.generateGoogleLogin(2)
                    const model = {
                        validationDBerror: error,
                        username,
                        googleUrlStudent: urlStudent, 
                        googleUrlRecruiter: urlRecruiter,
                        csrfToken: request.csrfToken(),
                    }
                    response.render('auth/login.hbs', model)
                }
            })
})

/**
 * URL /register
 */
router.route('/register')
    .all(authHelper.alreadyAuthenticated)
    .get(csrfProtection, (request, response, next) => {
        const urlStudent = authenticationManager.generateGoogleLogin(1)
        const urlRecruiter = authenticationManager.generateGoogleLogin(2)
        response.render('auth/register.hbs', {csrfToken: request.csrfToken(), googleUrlStudent: urlStudent, googleUrlRecruiter: urlRecruiter, active: { register: true }})
    })
    .post(csrfProtection, validator("register"), (request, response, next) => {

        const username = request.body.username
        const email = request.body.email
        const password = request.body.password
        const accountType = request.body.accountType

        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            const model = {
                validation: errors,
                username,
                email,
                csrfToken: request.csrfToken(),
            }

            return response.render('auth/register.hbs', model)
        }

        authenticationManager.register(username, email, password, accountType)
            .then(response.redirect('/login'))
            .catch(error => { 
                if (error.includes('db error')) {
                    response.render('errors/error.hbs', {validationErrors: 'Database error please try again later', errorCode: 500})
                } else {
                    const urlStudent = authenticationManager.generateGoogleLogin(1)
                    const urlRecruiter = authenticationManager.generateGoogleLogin(2)
                    const model = {
                        validationDBerror: errors,
                        username,
                        email,
                        googleUrlStudent: urlStudent, 
                        googleUrlRecruiter: urlRecruiter,
                        csrfToken: request.csrfToken(),
                    }
        
                    return response.render('auth/register.hbs', model)
                }
            })  
    })

/**
 * URL /logout
 */
router.route('/logout')
    .all(authHelper.isAuthenticated)
    .get(csrfProtection, (request, response, next) => {
        response.render('auth/logout.hbs', {csrfToken: request.csrfToken()})
    })
    .post(csrfProtection, (request, response, next) => {

        request.session.destroy(error =>  {
            if (error)
                return response.render('errors/error.hbs')

            response.redirect('/')
        })
    })

/**
 * URL /oauth2callback
 */
router.get('/oauth2callback', (request, response, next) => {
    authenticationManager.getGoogleAccount(request.query.code)
        .then(retrievedGoogleAccount => {
            googleAccount = { 
                username: retrievedGoogleAccount.username, 
                email: retrievedGoogleAccount.email, 
                hash: retrievedGoogleAccount.hash,
                userType: request.query.state
            }

            return Promise.resolve(googleAccount)
        })
        .then(retrievedGoogleAccount => {
            return authenticationManager.registerWithGoogle(retrievedGoogleAccount)
                .then(() => { return authenticationManager.loginWithGoogle(retrievedGoogleAccount) })
                .catch(error => {
                    if (error.type == 'unique violation')
                        return authenticationManager.loginWithGoogle(retrievedGoogleAccount)
                    
                    return Promise.reject(error)
                })
        })
        .then(retrievedAccount => {
            request.session.authenticated = true
            request.session.user = retrievedAccount

            if (request.session.user.seen === 1)
                response.redirect('/dashboard')
            else
                response.redirect('/dashboard/setup')
        })
        .catch(error => {
            response.render('errors/error.hbs', {validationErrors: 'Application error'})
        })
    })

module.exports = router