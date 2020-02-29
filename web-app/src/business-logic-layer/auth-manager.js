const bcrypt = require('bcrypt');

module.exports = function(container) {
    return {
        login: function(username, password, callback){

            if (username === '' || username == null) {
                callback(false, 'Username must be supplied')
            } else if (password === '' || password == null) {
                callback(false, 'Password must be supplied')
            } else {
                if (password.length < 6) {
                    callback(false, 'Password must be longer then 6 character')
                } else {
        
                    container.accountRepository.getByUsername(username).then(account => {
                        
                        if (account == null) {
                            return callback(false, "Wrong username/password")
                        }    

                        return bcrypt.compare(password, account.password).then(result => {
                            if (result) {
                                callback(true, account)
                            } else {
                                callback(false, 'Wrong username/password')
                            }
                        })
                    }).catch(error => {
                        callback(false, 'db error')
                    })
                }
            }
        },
        register: function(username, email, password, level, callback){

            if (username === '' || username == null) {
                callback(false, 'Username must be supplied')
            } else if (email === '' || email == null) {
                callback(false, 'Email must be supplied')
            } else if (password === '' || password == null) {
                callback(false, 'Password must be supplied')
            } else if (level === 'Choose an option' || level == null) {
                callback(false, 'You must choose an account type')
            } else {
                if (password.length < 6) {
                    callback(false, 'Password must be longer then 6 character')
                } else if (!checkValidEmail(email)) {
                    callback(false, 'Email is not valid')
                } else {
                    bcrypt.hash(password, 12).then(function(hash) {
        
                        var userType
                        if (level === 'Student') {
                            userType = 1
                        } else if (level === 'Recruiter') {
                            userType = 2
                        }
        
                        const account = { username, hash, email, userType}
        
                        container.accountRepository.create(account).then(result => {
                            callback(true, result.id)
                        }).catch(error => {
                            if (error.type == 'unique violation') {
                                callback(false, error.message)
                            } else {
                                callback(false, 'db error')
                            }
                        })
                    })
                }
            }
        }

    }
}

function checkValidEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true
    } else {
        return false
    }
}