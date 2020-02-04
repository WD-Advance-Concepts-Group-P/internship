const express = require('express')
const router = express.Router()

const authManager = require('../../business-logic-layer/auth-manager')

router.route('/login')
    .get(function(request, response, next) {
        response.render('auth/login.hbs')
    })
    .post(function(request, response, next) {

        authManager.login('test', 'test123', function(status, errorOrUser) {
            if (status) {
                request.session.authenticated = true
                request.session.user = errorOrUser

                response.send('logged in')
            } else {
                response.send(errorOrUser)
            }
        })

        //response.render('auth/login.hbs')
    })

router.get('/signup', function(request, response) {
    response.redirect('/sign-up')
})

router.route('/sign-up')
    .get(function(request, response, next) {
        response.render('auth/signup.hbs')
    })
    .post(function(request, response, next) {
        response.render('auth/signup.hbs')
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