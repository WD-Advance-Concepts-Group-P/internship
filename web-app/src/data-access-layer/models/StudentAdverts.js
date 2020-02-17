const Sequelize = require("sequelize")
const Accounts = require('./Accounts')

module.exports = sequelize.define("StudentAdverts", {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    field: {
        type: Sequelize.STRING(120),
        allowNull: false
    },
    contact: {
        type: Sequelize.STRING(120),
        allowNull: false
    },
    start_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    end_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    posted_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Accounts,
            key: 'id',
            // This declares when to check the foreign key constraint. PostgreSQL only.
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
    },
    updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
    }
});