const express = require('express')
const router = express.Router()

const container = require('../../main')
const profileManager = container.resolve('profileManager')
const authHelper = require('../../util/auth-helper')

router.route('/user/info')
    .all(authHelper.apiIsAuthenticated, function(request, response, next) {
        next();
    })
    .get(function(request, response, next) {
        //get user info
        response.json({'test': 'hello'})
    })
    .post(function(request, response, next) {
        //create user info
        response.json({'test': 'fail'})
    })
    .patch(function(request, response, next) {
        // update user info
        response.json({'test': 'fail'})
    })

module.exports = router