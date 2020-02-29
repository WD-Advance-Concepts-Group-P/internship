const Accounts = require('../models/Accounts') 
const Recruiter = require('../models/Recruiter')
const Students = require('../models/Students')

class AccountRepository {

    /**
     * Create a new account in the repository
     * @param {Object} account The 'account' object
     * @param {String} account.username The unique username
     * @param {String} account.password The hashed password
     * @param {String} account.email The unique email
     * @param {Number} account.userType The user type
     * @returns {Promise} Promise that represent the 'results'
     */
	create(account) {
        return new Promise((resolve, reject) => {
            Accounts.create({
                username: account.username,
                password: account.hash,
                email: account.email,
                user_type: account.userType
            }).then(user => {
                resolve({ id: user.id })
            }).catch(error => {

                reject(error.errors[0])
            })
        })
	}

    /**
     * Update a specific account in the repository
     * @param {Object} account The 'account' object
     * @param {Number} account.id The primary key id
     * @param {String} account.username The unique username
     * @param {String} account.password The hashed password
     * @param {String} account.email The unique email
     * @param {Number} account.userType The user type
     * @returns {Promise} Promise that represent the 'results'
     */

    createUserInfo(userType, info) {
        if (userType === 1) {
            return new Promise((resolve, reject) => {
                Students.create({
                    account_id: info.id,
                    first_name: info.first_name,
                    last_name: info.last_name,
                    birth_date: info.birth_date,
                    biography_text: info.biography_text,
                    school: info.school,
                    program: info.program,
                    graduation_year: info.graduation_year,
                    resume_url: info.resume_url,
                    profile_pic_url: info.profile_pic_url
                }).then(studentInfo => {
                    resolve({ id: studentInfo })
                }).catch(error => {
                    reject(error)
                })
            })
            
        } else if (userType === 2) {

            return new Promise((resolve, reject) => {
                Recruiter.create({
                    account_id: info.id,
                    first_name: info.first_name,
                    last_name: info.last_name,
                    phone_number: info.phone_number,
                    company_name: info.company_name,
                    company_logo_url: info.company_logo_url
                }).then(recruiterInfo => {
                    resolve({ id: recruiterInfo })
                }).catch(error => {
                    reject(error)
                })
            })
            
        }

    }

    updateUserInfo(userType, info) {
        if (userType === 1) {
            return new Promise((resolve, reject) => {
                Students.update({
                    first_name: info.first_name,
                    last_name: info.last_name,
                    birth_date: info.birth_date,
                    biography_text: info.biography_text,
                    school: info.school,
                    program: info.program,
                    graduation_year: info.graduation_year,
                    resume_url: info.resume_url,
                    profile_pic_url: info.profile_pic_url
                }, { where: {account_id: info.id}
                }).then(studentInfo => {
                    resolve({ id: studentInfo.id })
                }).catch(error => {
                    reject(error)
                })
            })

        } else if (userType === 2) {

            return new Promise((resolve, reject) => {
                Recruiter.update({
                    first_name: info.first_name,
                    last_name: info.last_name,
                    phone_number: info.phone_number,
                    company_name: info.company_name,
                    company_logo_url: info.company_logo_url
                }, { where: {account_id: info.id}
                }).then(recruiterInfo => {
                    resolve({ id: recruiterInfo.id })
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }

    getUserInfo(uid, userType) {
        if (userType === 1) {
            return new Promise((resolve, reject) => {
                Students.findOne({ where: {account_id: uid} }).then(info => {
                    resolve(info)
                }).catch(error => {
                    reject(error)
                })
            })
        } else if (userType === 2) {
            return new Promise((resolve, reject) => {
                Recruiter.findOne({ where: {account_id: uid} }).then(info => {
                    resolve(info)
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }

    updateSeenBefore(id) {
        return new Promise((resolve, reject) => {
            Accounts.update({
                seen: 1
            }, { where: { id: id }
            }).then(result => {
                resolve({ id: result.id })
            }).catch(error => {
                reject(error)
            })
        })
    }

    /**
     * Delete a specific account in the repository
     * @param {Number} id The primary key id
     * @returns {Promise} Promise that represent the 'results'
     */
    delete(id) {
        const sql = `DELETE FROM Accounts
            WHERE id = ?`

        return this.dbh.run(sql, [id])
	}
    
    /**
     * Get a specific account in the repository by the id
     * @param {Number} id The primary key id
     * @returns {Promise} Promise that represent the 'results'
     */
    getById(id) {
        const sql = `SELECT * FROM Accounts WHERE id = ?`

        return this.dbh.get(sql, [id])
	}
    
    /**
     * Get a specific account in the repository by the username
     * @param {Number} id The primary key id
     * @returns {Promise} Promise that represent the 'results'
     */
	getByUsername(username) {
        return new Promise((resolve, reject) => {
            Accounts.findOne({ where: {username: username} }).then((info) => {
                if (info === null) {
                    reject('Wrong username/password')
                } else {
                    resolve(info)
                }
            }).catch((_) => {
                reject("DB error")
            })
        })
	}
}

module.exports = AccountRepository