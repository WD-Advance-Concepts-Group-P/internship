const Sequelize = require("sequelize")
const Accounts = require('./Accounts')

module.exports = sequelize.define("Recruiter", {
    account_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: Accounts,
            key: 'id',
            // This declares when to check the foreign key constraint. PostgreSQL only.
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    first_name: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    phone_number: {
        type: Sequelize.STRING(20),
        allowNull: true
    },
    company_name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    company_logo_url: {
        type: Sequelize.TEXT,
        allowNull: true
    },
});