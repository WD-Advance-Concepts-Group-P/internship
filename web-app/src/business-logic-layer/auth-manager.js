const bcrypt = require('bcrypt');
const accountRepository = require('../data-access-layer/models/UserRepository')

exports.login = function(username, password, callback){

    if (username === '') {
        callback(false, 'Username must be supplied')
    } else if (password === '') {
        callback(false, 'Password must be supplied')
    } else {
        if (password.length < 6) {
            callback(false, 'Password must be longer then 6 character')
        } else {
            accountRepository.findOne({ where: {username: username} })
            .then(user => {
                bcrypt.compare(password, user.password).then(function(res) {
                    if (res) {
                        callback(true, null)
                    } else {
                        callback(false, 'Wrong username/password')
                    }
                });
            })
            .catch((error) => {
                console.log('error' + error)
                callback(false, 'Wrong username/password')
            })
        }
    }

}

exports.register = function(username, email, password, callback){

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
                accountRepository.create({username: username, email: email, password: hash})
                .then((user) => {
                    callback(true, user)
                })
                .catch((error) => {
                    callback(false, error)
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