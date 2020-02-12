const bcrypt = require('bcrypt');

module.exports = function(container) {
    return {
        login: function(username, password, callback){

            if (username === '') {
                callback(false, 'Username must be supplied')
            } else if (password === '') {
                callback(false, 'Password must be supplied')
            } else {
                if (password.length < 6) {
                    callback(false, 'Password must be longer then 6 character')
                } else {
        
                    container.accountRepository.getByUsername(username).then(account => {
                        
                        if (account == null) {
                            return callback(false, "That user did not exist.")
                        }
        
                        return bcrypt.compare(password, account.password).then(result => {
                            if (result) {
                                callback(true, account)
                            } else {
                                callback(false, 'Wrong username/password')
                            }
                        })
                    }).catch(error => {
                        console.log(error)
                        // check error to display correct message
                        callback(false, 'DB error')
                    })
                }
            }
        },
        register: function(username, email, password, level, callback){

            if (username === '') {
                callback(false, 'Username must be supplied')
            } else if (email === '') {
                callback(false, 'Email must be supplied')
            } else if (password === '') {
                callback(false, 'Password must be supplied')
            } else if (level === 'Choose an option') {
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
                            console.log(error + 'yes')
                            callback(false, 'DB error')
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