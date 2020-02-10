const RecruiterAdvertRepository = require('../data-access-layer-SQL/recruiter-advert-repository')
const recruiterAdvertRepository = new RecruiterAdvertRepository(global.dbhandler)

const StudentAdvertRepository = require('../data-access-layer-SQL/student_advert-repository')
const studentAdvertRepository = new StudentAdvertRepository(global.dbhandler)

exports.createStudentAdvert = function(user, title, body, field, contact, startDate, endDate, callback) {

    if (user.user_type === 1) {
        if (title === '') {
            callback(false, 'title must be supplied')
        } else if (body === '') {
            callback(false, 'body must be supplied')
        } else if (field === '') {
            callback(false, 'field must be supplied')
        } else if (contact === '') {
            callback(false, 'contact info must be supplied')
        } else if (startDate === '') {
            callback(false, 'start date must be supplied')
        } else if (endDate === '') {
            callback(false, 'end date must be supplied')
        } else {
            const info = { title, body, field, contact, startDate, endDate, postedBy: user.id}

            studentAdvertRepository.create(info).then(result => {
                callback(true, result.id)
            }).catch(error => {
                console.log(error)
                callback(false, 'db error')
            })
        }
    } else {
        callback(false, "You don't have acces to this feature")
    }
}

exports.createRecruiterAdvert = function(user, title, body, field, website, contact, positions, deadlineDate, callback) {

    if (user.user_type === 2) {
        if (title === '') {
            callback(false, 'title must be supplied')
        } else if (body === '') {
            callback(false, 'body must be supplied')
        } else if (field === '') {
            callback(false, 'field must be supplied')
        } else if (contact === '') {
            callback(false, 'contact info must be supplied')
        } else if (website === '') {
            callback(false, 'website must be supplied')
        } else if (positions === '') {
            callback(false, 'positions must be supplied')
        } else if (deadlineDate === '') {
            callback(false, 'date must be supplied')
        } else {
            const info = { title, body, field, website, contact, positions, deadlineDate, postedBy: user.id, address: 1}

            recruiterAdvertRepository.create(info).then(result => {
                callback(true, result.id)
            }).catch(error => {
                console.log(error)
                callback(false, 'db error')
            })
        }
    } else {
        callback(false, "You don't have acces to this feature")
    }
}

exports.getALlStudentAdverts = function(callback) {
    studentAdvertRepository.getAll().then(adverts => {
        console.log(adverts)
        callback(true, adverts)
    }).catch(error => {
        console.log(error)
        callback(false, 'error')
    })
}

exports.getALlRecruiterAdverts = function(callback) {
    recruiterAdvertRepository.getAll().then(adverts => {
        console.log(adverts)
        callback(true, adverts)
    }).catch(error => {
        console.log(error)
        callback(false, 'error')
    })
}