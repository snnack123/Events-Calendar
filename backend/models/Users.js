const Sequelize = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("user", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        full_name: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        },
        posts_created: {
            type: Sequelize.INTEGER,
        },
        posts_deleted: {
            type: Sequelize.INTEGER,
        },
        years_old: {
            type: Sequelize.INTEGER,
        },
        activation_code: {
            type: Sequelize.INTEGER,
        },
        activated: {
            type: Sequelize.INTEGER,
        }
    });
    return Users;
};