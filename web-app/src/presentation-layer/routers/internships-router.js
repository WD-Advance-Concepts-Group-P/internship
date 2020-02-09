const express = require('express')
const router = express.Router()
const csurf = require('csurf')

const csrfProtection = csurf()
const authHelper = require('../../util/auth-helper')

router.route('/create-advert')
    .all(authHelper.isAuthenticated, csrfProtection)
    .get(function(request, response, next) {
        if (request.session.user.user_type === 1) {
            response.render('internship/create-advert-student.hbs', {csrfToken: request.csrfToken()})
        } else if (request.session.user.user_type === 2) {
            response.render('internship/create-advert-recruiter.hbs', {csrfToken: request.csrfToken()})
        } else {
            response.send('server error')
        }
    })
    .post(function(request, response, next) {
        response.send('test')
    })

router.get('/positions', function(request, response) {
    response.send('alla praktikplatser')
})
    
module.exports = router