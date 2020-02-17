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
                Chat.sync()
                Recruiter.sync()
                Students.sync()
                RecruiterAdvert.sync()
                StudentAdvert.sync()
            }).catch(error => {
                console.log(error)
            })
        })
    })
}).catch(error => {
    console.log(error)
})
