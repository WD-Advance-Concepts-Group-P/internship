const express = require('express')
const router = express.Router()
const csurf = require('csurf')

const csrfProtection = csurf()
const authManager = require('../../business-logic-layer/auth-manager')

router.route('/login')
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

                response.send('logged in')
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
    .get(csrfProtection, function(request, response, next) {
        response.render('auth/signup.hbs', {csrfToken: request.csrfToken()})
    })
    .post(csrfProtection, function(request, response, next) {

        const username = request.body.username
        const email = request.body.email
        const password = request.body.password

        authManager.register(username, email, password, function(status, errorOrUser) {
            if (status) {
                response.send('created' + errorOrUser)
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