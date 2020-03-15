const bcrypt = require('bcrypt');
const { google } = require('googleapis')

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
                        callback(false, error)
                    })
                }
            }
        },
        getUser: async function(authCode, callback) {
            const client = new google.auth.OAuth2(
                process.env.GOOGLE_CLIENT_ID,
                process.env.GOOGLE_CLIENT_SECRET,
                'http://localhost:8080/oauth2callback'
            )

            const {tokens} = await client.getToken(authCode)
            client.credentials = tokens

            const people = google.people({
                version: 'v1',
                auth: client
            })

            const response = await people.people.get({
                resourceName: 'people/me',
                personFields: 'emailAddresses,names'
            })

            const user = {
                'id': response.data.names[0].metadata.source.id,
                'email': response.data.emailAddresses[0].value,
                'username': response.data.names[0].displayName,
                'hash': 'g00gl3'
            }
            callback(user)
        },
        generateGoogleLogin: function(userType) {
            const client = new google.auth.OAuth2(
                process.env.GOOGLE_CLIENT_ID,
                process.env.GOOGLE_CLIENT_SECRET,
                'http://localhost:8080/oauth2callback'
            )
            return client.generateAuthUrl({ 
                scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'],
                state: [userType]
            })
        },
        setupGoogleUser: function(account, callback) {
            container.accountRepository.create(account).then(result => {
                container.accountRepository.getById(result.id).then(account => {
                    callback(null, account)
                }).catch(error => {
                    console.log('nu 1')
                    console.log(error)
                    callback('db error', null)
                })
            }).catch(error => {
                if (error.type == 'unique violation') {
                    container.accountRepository.getByEmail(account.email).then(account => { 
                        callback(null, account)
                    }).catch(error => {
                        console.log('nu 2')
                        console.log(error)
                        callback('db error', null)
                    })
                } else {
                    console.log('nu 3')
                    console.log(error)
                    callback('db error', null)
                }
            })
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