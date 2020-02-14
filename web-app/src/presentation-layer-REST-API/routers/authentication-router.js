const express = require('express')
const router = express.Router()

router.route('/login-sessions')
    .all(function(request, response, next) {
        next();
    })
    .get(function(request, response, next) {
        //show logged in sessions
        response.json({'test': 'hello'})
    })
    .post(function(request, response, next) {
        //login user
        response.json({'test': 'fail'})
    })
    .delete(function(request, response, next) {
        //sign out
    })

router.route('/user')
    .all(function(request, response, next) {
        next();
    })
    .get(function(request, response, next) {
        //get user info
        response.json({'test': 'hello'})
    })
    .post(function(request, response, next) {
        //create new user
        response.json({'test': 'fail'})
    })

module.exports = router