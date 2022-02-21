const Sequelize = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Events = sequelize.define("event", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.STRING,
        },
        label: {
            type: Sequelize.STRING,
        },
        day: {
            type: Sequelize.STRING,
        },
        user_id: {
            type: Sequelize.INTEGER,
        }
    });
    return Events;
};