const express = require('express')
const router = express.Router()
const csurf = require('csurf')
const csrfProtection = csurf()
const authHelper = require('../../util/auth-helper')

const container = require('../../main')
const profileManager = container.resolve('profileManager')

router.get('/', authHelper.isAuthenticated, function(request, response) {
    console.log(request.session.user)
    const model = {
        user: request.session.user.username
    }
    response.render('profile/dashboard.hbs', model)
})

router.route('/setup')
    .all(authHelper.isAuthenticated, function(request, response, next) {
        if (request.session.user.seen === 1) {
            response.redirect('/profile')
        } else {
            next()
        }
    })
    .get(csrfProtection, function(request, response, next) {
        if (request.session.user.user_type === 1) {
            response.render('profile/student-info.hbs', {csrfToken: request.csrfToken()})
        } else if (request.session.user.user_type === 2) {
            response.render('profile/recruiter-info.hbs', {csrfToken: request.csrfToken()})
        } else {
            response.send('server error')
        }
    })
    .post(csrfProtection, function(request, response, next) {
        if (request.session.user.user_type === 1) {
            profileManager.createStudentInfo(request.session.user.id, request.body.firstname, request.body.lastname, request.body.birthdate, request.body.bio, request.body.school, request.body.program, request.body.graduationdate, request.body.resume, request.body.profilepic, function(status, error) {
                if (status) {
                    request.session.user.seen = 1
                    response.redirect('/profile')
                } else {
                    response.send('no')
                }
            })
        } else if (request.session.user.user_type === 2) {
            profileManager.createRecruiterInfo(request.session.user.id, request.body.firstname, request.body.lastname, request.body.companyname, request.body.phonenumber, request.body.companylogo, function(status, error) {
                if (status) {
                    request.session.user.seen = 1
                    response.redirect('/profile')
                } else {
                    response.send('no')
                }
            })
        } else {
            response.send('server error')
        } 
    })

router.route('/update')
    .all(authHelper.isAuthenticated, function(request, response, next) {
        next();
    })
    .get(csrfProtection, function(request, response, next) {
        profileManager.getUserInfo(request.session.user, function(status, errorOrInfo) {
            if (status) {
                if (request.session.user.user_type === 1) {
                    const model = {
                        title: 'Update info',
                        csrfToken: request.csrfToken(),
                        firstname: errorOrInfo.first_name,
                        lastname: errorOrInfo.last_name,
                        birthdate: errorOrInfo.birth_date,
                        bio: errorOrInfo.biography_text,
                        school: errorOrInfo.school,
                        program: errorOrInfo.program,
                        graduationdate: errorOrInfo.graduation_year,
                        resume: errorOrInfo.resume_url,
                        profile_picture: errorOrInfo.profile_pic_url
                    }
                    response.render('profile/student-info.hbs', model)
                } else if (request.session.user.user_type === 2) {
                    const model = {
                        title: 'Update info',
                        csrfToken: request.csrfToken(),
                        firstname: errorOrInfo.first_name,
                        lastname: errorOrInfo.last_name,
                        companyname: errorOrInfo.company_name,
                        phonenumber: errorOrInfo.phone_number,
                        companylogo: errorOrInfo.company_logo_url
                    }
                    response.render('profile/recruiter-info.hbs', model)
                } else {
                    response.send('server error')
                }  
            } else {
                response.send('noooo')
            }
        })
    })
    .post(csrfProtection, function(request, response, next) {
        if (request.session.user.user_type === 1) {
            profileManager.updateInfoStudent(request.session.user.id, request.body.firstname, request.body.lastname, request.body.birthdate, request.body.bio, request.body.school, request.body.program, request.body.graduationdate, request.body.resume, request.body.profilepic, function(status, error) {
                if (status) {
                    request.session.user.seen = 1
                    response.redirect('/profile')
                } else {
                    response.send('no')
                }
            })
        } else if (request.session.user.user_type === 2) {
            profileManager.updateInfoRecruiter(request.session.user.id, request.body.firstname, request.body.lastname, request.body.companyname, request.body.phonenumber, request.body.companylogo, function(status, error) {
                if (status) {
                    request.session.user.seen = 1
                    response.redirect('/profile')
                } else {
                    response.send('no')
                }
            })
        } else {
            response.send('server error')
        }
    })

module.exports = router