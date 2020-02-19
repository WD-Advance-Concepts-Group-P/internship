const awilix = require('awilix')

//repositories
const AccountRepository = require('./data-access-layer-SQL/account-repository')
const RecruiterAdvertRepository = require('./data-access-layer-SQL/recruiter-advert-repository')
const StudentAdvertRepository = require('./data-access-layer-SQL/student-advert-repository')
const ChatRepository = require('./data-access-layer-SQL/chat-repository')

//Sequelize
const AccountRepositorySequelize = require('./data-access-layer/repositories/account-repository')
const RecruiterAdvertRepositorySequelize = require('./data-access-layer/repositories/recruiter-advert-repository')
const StudentAdvertRepositorySequelize = require('./data-access-layer/repositories/student-advert-repository')
const ChatRepositorySequelize = require('./data-access-layer/repositories/chat-repository')

//managers
const authManager = require('./business-logic-layer/auth-manager')
const internshipManager = require('./business-logic-layer/internship-manager')
const chatManager = require('./business-logic-layer/chat-manager')
const profileManager = require('./business-logic-layer/profile-manager')

const container = awilix.createContainer()

container.register('accountRepository', awilix.asClass(AccountRepositorySequelize))
container.register('recruiterAdvertRepository', awilix.asClass(RecruiterAdvertRepositorySequelize))
container.register('studentAdvertRepository', awilix.asClass(StudentAdvertRepositorySequelize))
container.register('chatRepository', awilix.asClass(ChatRepositorySequelize))

container.register('authManager', awilix.asFunction(authManager))
container.register('internshipManager', awilix.asFunction(internshipManager))
container.register('chatManager', awilix.asFunction(chatManager))
container.register('profileManager', awilix.asFunction(profileManager))

module.exports = container