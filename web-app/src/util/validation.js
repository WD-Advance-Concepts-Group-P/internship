const { check } = require('express-validator');

const container = require('../main')
const accountRepository = container.resolve('accountRepository')

const registration = [
    check('username').isAlphanumeric().isLength({ min: 4, max: 20}).custom(value => {
        return accountRepository.getByUsername(value).then(account => {
            if (account) {
                return Promise.reject("Username already in use.");
            }
        })
    }),
    check('email').isEmail().withMessage("Invalid email.").custom(value => {
        return accountRepository.getByEmail(value).then(account => {
            if (account) {
                return Promise.reject('Email already in use.');
            }
        })
    }),
    check('password', "The password was invalid.").isLength({min: 6})
        /*if (value !== req.body.confirmPassword) {
            throw new Error("Passwords don't match");
        } else {
            return value;
        }*/
]

const login = [
    check('username').isAlphanumeric().isLength({ min: 4, max: 20})
]

const studentInformation = [
    check('firstname', 'You need to set a first name').not().isEmpty(),
    check('lastname', "You need to set a last name.").not().isEmpty()
]

const recruiterInformation = [
    check('firstname', 'You need to set a first name').not().isEmpty(),
    check('lastname', 'You need to set a last name').not().isEmpty(),
    check('companyname', 'You need to set a company name.').not().isEmpty()
]

const studentAdvert = [
    check('title', 'You need to set a title').not().isEmpty(),
    check('body', 'You need to set a body').not().isEmpty(),
    check('field', 'You need to set a field').not().isEmpty(),
    check('contact', 'You need to set contact information').not().isEmpty()
]

const recruiterAdvert = [
    check('title', 'You need to set a title').not().isEmpty(),
    check('body', 'You need to set a body').not().isEmpty(),
    check('field', 'You need to set a field').not().isEmpty(),
    check('city', 'You need to set a city').not().isEmpty(),
    check('contact', 'You need to set contact information').not().isEmpty(),
    check('website', 'You need to set a website').not().isEmpty(),
    check('positions', 'You need to set the number of positions').not().isEmpty()
]

function validator(validate) {
    switch (validate) {
        case 'register':
            return registration
        case 'login':
            return login
        case 'studentInformation':
            return studentInformation
        case 'recruiterInformation':
            return recruiterInformation
        case 'studentAdvert':
            return studentAdvert
        case 'recruiterAdvert':
            return recruiterAdvert
    }
}

module.exports = validator