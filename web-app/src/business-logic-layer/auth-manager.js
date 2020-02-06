const bcrypt = require('bcrypt');
const accountRepository = require('../data-access-layer-SQL/account-repository')

exports.login = function(username, password, callback){

    if (username === '') {
        callback(false, 'Username must be supplied')
    } else if (password === '') {
        callback(false, 'Password must be supplied')
    } else {
        if (password.length < 6) {
            callback(false, 'Password must be longer then 6 character')
        } else {
            accountRepository.getAccountByUsername(username, function(error, user) {
                if (error === null) {
                    if (user != null) {
                        bcrypt.compare(password, user.password).then(function(res) {
                            if (res) {
                                callback(true, user)
                            } else {
                                callback(false, 'Wrong username/password')
                            }
                        });
                    } else {
                        callback(false, 'Wrong username/password')
                    }
                } else {
                    console.log(error)
                    // check error to display correct message
                    callback(false, 'DB error')
                }
            })
        }
    }

}

exports.register = function(username, email, password, level, callback){

    if (username === '') {
        callback(false, 'Username must be supplied')
    } else if (email === '') {
        callback(false, 'Email must be supplied')
    } else if (password === '') {
        callback(false, 'Password must be supplied')
    } else {
        if (password.length < 6) {
            callback(false, 'Password must be longer then 6 character')
        } else if (!checkValidEmail(email)) {
            callback(false, 'Email is not valid')
        } else {
            bcrypt.hash(password, 12).then(function(hash) {

                const account = { email, username, hash, level }

                accountRepository.createAccount(account, function(error, rowId) {
                    if (error === null) {
                        callback(true, rowId)
                    } else {
                        // check error
                        callback(false, 'DB error')
                    }
                })
            });
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