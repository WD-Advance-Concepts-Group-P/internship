const Sequelize = require("sequelize")
const Accounts = require('./Accounts')

module.exports = sequelize.define("Students", {
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
    birth_date: {
        type: Sequelize.DATE,
        allowNull: true
    },
    biography_text: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    school: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    program: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    graduation_year: {
        type: Sequelize.DATE,
        allowNull: true
    },
    resume_url: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    profile_pic_url: {
        type: Sequelize.TEXT,
        allowNull: true
    },
});