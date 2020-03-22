const bcrypt = require('bcrypt')
const { google } = require('googleapis')

let container = null

/**
 * Login to a email/password account
 * @param {*} username 
 * @param {*} password 
 */
function login(username, password) {
    return new Promise((resolve, reject) => {
        return container.accountRepository.getByUsername(username)
            .then(account => {
                if (account == null)
                    return reject("No account found with that username.")

                return bcrypt.compare(password, account.password)
                    .then(result => {
                        if (result)
                            return resolve(account)
                        
                         return reject("Password did not match")
                    })
                    .catch(error => reject(error))
        })  
    })
}


/**
 * 
 * @param {*} username 
 * @param {*} email 
 * @param {*} password 
 * @param {*} accountType 
 */
function register(username, email, password, accountType) {
    return new Promise((resolve, reject) => {
        return bcrypt.hash(password, 12)
            .then(hash => {
                let userType = null

                switch(accountType) {
                    case 'Student':
                        userType = 1
                      break;
                    case 'Recruiter':
                        userType = 2
                      break;
                    default:
                        userType = 0
                  }

                const account = { username, hash, email, userType}

                console.log(account)
                return container.accountRepository.create(account)
                    .then(result => {
                        resolve(result.id)
                    })
            })
    })
}


function loginWithGoogle(account) {
    return new Promise((resolve, reject) => {
        container.accountRepository.getByEmail(account.email)
            .then(retrievedAccount => { return resolve(retrievedAccount) })
            .catch(error => { return reject(error) })
    })
}

function registerWithGoogle(account) {
    return new Promise((resolve, reject) => {
        container.accountRepository.create(account)
            .then(result => {
                account.id = result.id
                resolve(account)
            })
            .catch(error => reject(error))
            .then(() => { return container.accountRepository.getById(account.id)})
            .then(retrievedAccount => resolve(retrievedAccount))
            .catch(error => {
                if (error.type == 'unique violation') {
                    console.log("Hello")
                    container.accountRepository.getByEmail(account.email)
                        .then(retrievedAccount => { return resolve(retrievedAccount) })
                        .catch(error => { return reject(error) })
                }   
                else 
                    reject(error)
            })
    })
}

/**
 * 
 * @param {*} authCode 
 */
function getGoogleAccount(authCode) {
    return new Promise((resolve, reject) => {

        const client = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            'http://localhost:8080/oauth2callback'
        )    

        client.getToken(authCode)
            .then(credentials => client.credentials = credentials.tokens)
            .then(() => {
                const plus = google.people({
                    version: 'v1',
                    auth: client
                })

                console.log(client.credentials)

                return plus.people.get({
                    resourceName: 'people/me',
                    personFields: 'emailAddresses,names'
                }).then(response => {
                    const user = {
                        'id': response.data.names[0].metadata.source.id,
                        'email': response.data.emailAddresses[0].value,
                        'username': response.data.names[0].displayName,
                        'hash': 'g00gl3'
                    }
    
                    resolve(user)
                })
            })
            .catch(error => reject(error))
    })
}

/**
 * 
 * @param {*} userType 
 */
function generateGoogleLogin(userType) {
    const client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        'http://localhost:8080/oauth2callback'
    )
    return client.generateAuthUrl({ 
        scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'],
        state: [userType]
    })
}

module.exports = function(_container) {
    container = _container
    return {
        login,
        loginWithGoogle,
        register, 
        registerWithGoogle,
        getGoogleAccount,
        generateGoogleLogin
    }
}



















/*
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
                    callback('db error', null)
                })
            }).catch(error => {
                if (error.type == 'unique violation') {
                    container.accountRepository.getByEmail(account.email).then(account => { 
                        callback(null, account)
                    }).catch(error => {
                        callback('db error', null)
                    })
                } else {
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
*/