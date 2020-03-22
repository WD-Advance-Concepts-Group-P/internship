let container = null

const USER_TYPE_STUDENT = 1
const USER_TYPE_RECRUITER = 2

/**
 * 
 * @param {*} user 
 * @param {*} values 
 */
function createUserInformation(user, values) {
    return new Promise((resolve, reject) => {

        let information = null

        switch(user.user_type) {

            case USER_TYPE_STUDENT:

                informaton = {
                    id: user.id, 
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
                
                container.accountRepository.createUserInfo(USER_TYPE_STUDENT, informaton)
                    .then(result => { 
                        return container.accountRepository.updateSeenBefore(user.id)
                            .then(resolve(result.id))
                    })
                    .catch(error => reject(error))
                
                break

            case USER_TYPE_RECRUITER:

                informaton = {
                    id: user.id, 
                    first_name: values.firstname, 
                    last_name: values.lastname, 
                    phone_number: values.phonenumber,
                    company_name: values.companyname,
                    company_logo_url: values.companylogo
                }

                container.accountRepository.createUserInfo(USER_TYPE_RECRUITER, informaton)
                    .then(result => { 
                        return container.accountRepository.updateSeenBefore(user.id)
                            .then(resolve(result.id))
                    })
                    .catch(error => reject(error))
                
                                
                break
        }
    })
}

/**
 * 
 * @param {*} user 
 */
function getUserInformation(user) {
    return new Promise((resolve, reject) => {
        container.accountRepository.getUserInfo(user.id, user.user_type)
            .then(information => resolve(information))
            .catch(error => reject(error))
    })
}

/**
 * 
 * @param {*} user 
 * @param {*} information 
 */
function updateUserInformation(user, information) {
    return new Promise((resolve, reject) => {
        switch(user.user_type) {

            case USER_TYPE_STUDENT:
                information.id = user.id

                container.accountRepository.updateUserInfo(USER_TYPE_STUDENT, information)
                    .then(result => { resolve(result.id) })
                    .catch(error => reject(error))

            case USER_TYPE_RECRUITER:
                information.id = user.id

                container.accountRepository.updateUserInfo(USER_TYPE_RECRUITER, information)
                    .then(result => { resolve(result.id) })
                    .catch(error => reject(error))
        }
    })
}

module.exports = function(_container) {
    container = _container
    return {
        createUserInformation,
        getUserInformation,
        updateUserInformation
    }
}