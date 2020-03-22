const express = require('express')
const router = express.Router()

// Awilix
const container = require('../../main')
const internshipManager = container.resolve('internshipManager')


/**
 * URL /
 */
router.get('/', (request, response) => {
    response.render('home.hbs', { active: { home: true} })
})

router.get('/about', (request, response) => {
    const model = {}
    model.active = { about: true }
    response.render('about.hbs', model)
})

router.get('/contact', (request, response) => {
    const model = {} 
    model.active = { contact: true }
    response.render('contact.hbs', model)
})

/**
 * URL /search
 */
router.get('/search', (request, response) => {

    if (request.query.q == null || request.query.q == "") {
        switch(request.query.type) {
            case 'Student':
                return response.redirect('/internships/student-adverts')
            case 'Recruiter':
                return response.redirect('/internships/recruiter-adverts')
        }        
    }

    internshipManager.searchAdverts(request.query.type, request.query.q)
        .then(posts => {
            const model = {
                adverts: posts,
                search: request.query.q
            }
            switch(request.query.type) {
                case 'Student':
                    response.render("internship/student-adverts.hbs", model)
                    break
                case 'Recruiter':
                    response.render("internship/recruiter-adverts.hbs", model)
                    break
            }        
        })
        .catch(error => {
            console.log(error)
        })
})

module.exports = router