const Accounts = require('./models/Accounts')
const Chat = require('./models/Chat')
const Recruiter = require('./models/Recruiter')
const Students = require('./models/Students')
const RecruiterAdvert = require('./models/RecruiterAdverts')
const StudentAdvert = require('./models/StudentAdverts')
const UserTypes = require('./models/UserTypes')

UserTypes.sync().then(() => {
    UserTypes.create({
        name: 'Student',
        description: "Student user access type"
    }).then(() => {
        UserTypes.create({
            name: 'Recruiter',
            description: "Recruiter user access type"
        }).then(() => {
            Accounts.sync().then(() => {
                Chat.sync().catch(error => {
                    console.log(error)
                })
                Recruiter.sync().catch(error => {
                    console.log(error)
                })
                Students.sync().catch(error => {
                    console.log(error)
                })
                RecruiterAdvert.sync().catch(error => {
                    console.log(error)
                })
                StudentAdvert.sync().catch(error => {
                    console.log(error)
                })
            }).catch(error => {
                console.log(error)
            })
        })
    })
}).catch(error => {
    console.log(error)
})