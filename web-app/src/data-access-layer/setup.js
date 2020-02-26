const UserTypes = require('./models/UserTypes')

sequelize.sync().then(() => {
    console.log('yes synced')
    UserTypes.create({
        name: 'Student',
        description: "Student user access type"
    }).then(() => {
        console.log('created student usertype')
    }).catch((error) => {
        console.log('error creating the usertype ' + error)
    })

    UserTypes.create({
        name: 'Recruiter',
        description: "Recruiter user access type"
    }).then(() => {
        console.log('created recruiter usertype')
    }).catch((error) => {
        console.log('error creating the usertype ' + error)
    })

}).catch((error) => {
    console.log('not synced ' + error)
})