const AccountRepository = require('../data-access-layer-SQL/account-repository')
const accountRepository = new AccountRepository(global.dbhandler)

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

        accountRepository.createUserInfo(1, info).then(result => {
            accountRepository.updateSeenBefore(uid).then(resultSeen => {
                callback(true, result.id)
            }).catch(error => {
                console.log(error + ' test')
                callback(false, 'DB error')
            })
        }).catch(error => {
            console.log(error + 'yes')
            callback(false, 'DB error')
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

        accountRepository.createUserInfo(2, info).then(result => {
            accountRepository.updateSeenBefore(uid).then(resultSeen => {
                callback(true, result.id)
            }).catch(error => {
                console.log(error + 'yes')
                callback(false, 'DB error')
            })
        }).catch(error => {
            console.log(error + 'yes')
            callback(false, 'DB error')
        })
    }
}