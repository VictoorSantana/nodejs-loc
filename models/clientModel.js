const Sequelize = require('sequelize');
const db = require('../props/connection');


const model = db.define('tb_clients', {    
    id: {
        type: Sequelize.STRING,        
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    zip: {
        type: Sequelize.STRING,
        allowNull: false
    }
  }, {
    timestamps: false
});

module.exports = model;