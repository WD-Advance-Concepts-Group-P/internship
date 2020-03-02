module.exports = function(container) {
    return {
        createStudentInfo: function(uid, values, callback){

            if (values.firstname === '' || values.firstname == null) {
                callback(false, 'firstname must be supplied')
            } else if (values.lastname === '' || values.lastname == null) {
                callback(false, 'lastname must be supplied')
            } else if (uid === '' || uid == null) {
                callback(false, 'uid must be supplied')
            } else {
                const info = {
                    id: uid, 
                    first_name: values.firstname, 
                    last_name: values.lastname, 
                    birth_date: values.birthdate ? values.birthdate : null, 
                    biography_text: values.bio, 
                    school: values.school, 
                    program: values.program, 
                    graduation_year: values.graduationdate ? values.graduationdate : null, 
                    resume_url: values.resume, 
                    profile_pic_url: values.profilepic
                } 
    
                container.accountRepository.createUserInfo(1, info).then(result => {
                    container.accountRepository.updateSeenBefore(uid).then(resultSeen => {
                        callback(true, result.id)
                    }).catch(error => {
                        console.log(error + ' test')
                        callback(false, 'DB error')
                    })
                }).catch(error => {
                    console.log(error + ' yes')
                    callback(false, 'DB error')
                })
            }
        },
        createRecruiterInfo: function(uid, values, callback){

            if (values.firstname === '' || values.firstname == null) {
                callback(false, 'firstname must be supplied')
            } else if (values.lastname === '' || values.lastname == null) {
                callback(false, 'lastname must be supplied')
            } else if (uid === '' || uid == null) {
                callback(false, 'uid must be supplied')
            } else if (values.companyname === '' || values.companyname == null) {
                callback(false, 'company name must be supplied')
            } else {
                const info = {
                    id: uid, 
                    first_name: values.firstname, 
                    last_name: values.lastname, 
                    phone_number: values.phonenumber,
                    company_name: values.companyname,
                    company_logo_url: values.companylogo,
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
                    console.log(info)
                    if (info == null) {
                        callback(false, 'No Info')
                    } else {
                        callback(true, info)
                    }
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