module.exports = function(container) {
    return {
        createStudentInfo: function(uid, first_name, last_name, birth_date, biography_text, school, program, graduation_year, resume_url, profile_pic_url, callback){

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
                    birth_date: birth_date ? birth_date : null, 
                    biography_text, 
                    school, 
                    program, 
                    graduation_year: graduation_year ? graduation_year : null, 
                    resume_url, 
                    profile_pic_url
                } 
    
                container.accountRepository.createUserInfo(1, info).then(result => {
                    container.accountRepository.updateSeenBefore(uid).then(resultSeen => {
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
        },
        createRecruiterInfo: function(uid, first_name, last_name, company_name, phone_number, company_logo_url, callback){

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
        
                container.accountRepository.createUserInfo(2, info).then(result => {
                    container.accountRepository.updateSeenBefore(uid).then(resultSeen => {
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
        },
        updateInfoStudent: function(uid, first_name, last_name, birth_date, biography_text, school, program, graduation_year, resume_url, profile_pic_url, callback){

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
                    birth_date: birth_date ? birth_date : null, 
                    biography_text, 
                    school, 
                    program, 
                    graduation_year: graduation_year ? graduation_year : null,
                    resume_url, 
                    profile_pic_url
                } 
        
                container.accountRepository.updateUserInfo(1, info).then(result => {
                    callback(true, result.id)
                }).catch(error => {
                    console.log(error + 'yes')
                    callback(false, 'DB error')
                })
            }
        },
        updateInfoRecruiter: function(uid, first_name, last_name, company_name, phone_number, company_logo_url, callback){

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
        
                container.accountRepository.updateUserInfo(2, info).then(result => {
                    callback(true, result.id)
                }).catch(error => {
                    console.log(error + 'yes')
                    callback(false, 'DB error')
                })
            }
        },
        getUserInfo: function(user, callback) {
            if (user.user_type === 1 || user.user_type === 2) {
                container.accountRepository.getUserInfo(user.id, user.user_type).then(info => {
                    callback(true, info)
                }).catch(error => {
                    console.log(error)
                    callback(false, error)
                })
            } else {
                callback(false, 'You don\'t have access to this feature')
            }
        }
    }
}