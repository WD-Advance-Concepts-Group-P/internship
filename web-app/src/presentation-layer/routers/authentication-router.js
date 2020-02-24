const express = require('express')
const router = express.Router()
const csurf = require('csurf')

const csrfProtection = csurf()
//const authManager = require('../../business-logic-layer/auth-manager')
const authHelper = require('../../util/auth-helper')

const container = require('../../main')
const authManager = container.resolve('authManager')

router.route('/login')
    .all(authHelper.alreadyAuthenticated)
    .get(csrfProtection, function(request, response, next) {
        response.render('auth/login.hbs', {csrfToken: request.csrfToken()})
    })
    .post(csrfProtection, function(request, response, next) {
        const username = request.body.username
        const password = request.body.password

        authManager.login(username, password, function(status, errorOrUser) {
            if (status) {
                request.session.authenticated = true
                request.session.user = errorOrUser

                if (request.session.user.seen === 1) {
                    response.redirect('/profile')
                } else {
                    response.redirect('/profile/setup')
                }
            } else {
                const model = {
                    validationErrors: errorOrUser,
                    username,
                    csrfToken: request.csrfToken(),
                }
                response.render('auth/login.hbs', model)
            }
        })
    })

router.get('/signup', function(request, response) {
    response.redirect('/sign-up')
})

router.route('/sign-up')
    .all(authHelper.alreadyAuthenticated)
    .get(csrfProtection, function(request, response, next) {
        response.render('auth/signup.hbs', {csrfToken: request.csrfToken()})
    })
    .post(csrfProtection, function(request, response, next) {

        const username = request.body.username
        const email = request.body.email
        const password = request.body.password
        const accountType = request.body.accountType

        authManager.register(username, email, password, accountType, function(status, errorOrUser) {
            if (status) {
                response.redirect('/login')
            } else {
                const model = {
                    validationErrors: errorOrUser,
                    username,
                    email,
                    csrfToken: request.csrfToken(),
                }
                response.render('auth/signup.hbs', model)
            }
        })
    })

router.route('/logout')
    .all(authHelper.isAuthenticated)
    .get(csrfProtection, function(request, response, next) {
        response.render('auth/logout.hbs', {csrfToken: request.csrfToken()})
    })
    .post(csrfProtection, function(request, response, next) {
        request.session.destroy(function(error) {
            if (error) {
                response.render('errors/500.hbs')
            } else {
                response.redirect('/')
            }
        })
    })


router.route('/forgotten-password')
    .get(function(request, response, next) {
        response.render('auth/forgot-password.hbs')
    })
    .post(function(request, response, next) {
        response.render('auth/forgot-password.hbs')
    })

router.route('/reset/password/:id')
    .get(function(request, response, next) {
        response.send('reset password form')
    })
    .post(function(request, response, next) {
        response.send('reset password form')
    })

module.exports = router