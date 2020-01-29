const express = require('express')
const router = express.Router()

router.route('/login')
    .get(function(request, response, next) {
        response.render('auth/login.hbs')
    })
    .post(function(request, response, next) {
        response.render('auth/login.hbs')
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