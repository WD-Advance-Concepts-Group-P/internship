const express = require('express')
const router = express.Router()

const container = require('../../main')
const internshipManager = container.resolve('internshipManager')

// Index
router.get('/', function(request, response) {
    response.render('home.hbs')
})

router.get('/search', function(request, response) {

    var type = request.query.type
    const search = request.query.q

    if (type == null || type == '') {
        type = 'recruiter'
    }

    if (search == null || search == '') {
        if (type == 'recruiter') {
            response.redirect('/positions')
        } else {
            response.redirect('/student-adverts')
        }
    } else {
        internshipManager.searchAdverts(type, search, function(status, advertsOrError) {
            if (status) {
                var model = {
                    sendMessageHidden: true,
                    Posts: advertsOrError,
                    search: request.query.q
                }
                if (type == 'recruiter') {
                    response.render("internship/recruiter-adverts.hbs", model)
                } else if (type == 'student') {
                    response.render("internship/student-adverts.hbs", model)
                } else {
                    response.render('errors/error.hbs', {validationErrors: 'Wrong type submitted'})
                }
            } else {
                response.render('errors/error.hbs', {validationErrors: advertsOrError})
            }
        })
    }
})

module.exports = router