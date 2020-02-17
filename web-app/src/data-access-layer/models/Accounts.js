const Sequelize = require("sequelize")
const UserTypes = require('./UserTypes')

module.exports = sequelize.define("Accounts", {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
    },
    seen: {
        type: Sequelize.INTEGER(1),
        allowNull: false,
        defaultValue: 0,
    },
    user_type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: UserTypes,
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