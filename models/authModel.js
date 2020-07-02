const Sequelize = require('sequelize');
const db = require('../props/connection');


const model = db.define('tb_users', {    
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
  }, {
    timestamps: false
});

module.exports = model;