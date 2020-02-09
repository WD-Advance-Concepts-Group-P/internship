const accountRepository = require('../data-access-layer-SQL/user-type-repository')

exports.createStudentInfo = function(uid, first_name, last_name, birth_date, biography_text, school, program, graduation_year, resume_url, profile_pic_url, callback){

    if (first_name === '') {
        callback(false, 'firstname must be supplied')
    } else if (last_name === '') {
        callback(false, 'lastname must be supplied')
    } else if (uid === '') {
        callback(false, 'uid must be supplied')
    } else {
        const info = {
            id: uid, 
            first_name, 
            last_name, 
            birth_date, 
            biography_text, 
            school, 
            program, 
            graduation_year, 
            resume_url, 
            profile_pic_url
        } 

        accountRepository.createStudentInfo(info, function(error, status) {
            if (error === null) {
                callback(true, null)
            } else {
                callback(false, 'db error')
            }
        })
    }
}

exports.createRecruiterInfo = function(uid, first_name, last_name, company_name, phone_number, company_logo_url, callback){

    if (first_name === '') {
        callback(false, 'firstname must be supplied')
    } else if (last_name === '') {
        callback(false, 'lastname must be supplied')
    } else if (uid === '') {
        callback(false, 'uid must be supplied')
    } else if (company_name === '') {
        callback(false, 'company name must be supplied')
    } else {
        const info = {
            id: uid, 
            first_name, 
            last_name, 
            phone_number,
            company_name,
            company_logo_url,
        } 

        accountRepository.createRecruiterInfo(info, function(error, status) {
            if (error === null) {
                callback(true, null)
            } else {
                callback(false, 'db error')
            }
        })
    }
}