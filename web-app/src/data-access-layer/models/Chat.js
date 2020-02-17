const Sequelize = require("sequelize")
const Accounts = require('./Accounts')

module.exports = sequelize.define("Chat", {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    sender_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Accounts,
            key: 'id',
            // This declares when to check the foreign key constraint. PostgreSQL only.
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    receiver_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Accounts,
            key: 'id',
            // This declares when to check the foreign key constraint. PostgreSQL only.
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
    },
});