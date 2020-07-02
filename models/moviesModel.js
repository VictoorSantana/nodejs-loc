const Sequelize = require('sequelize');
const db = require('../props/connection');


const model = db.define('tb_movies', {    
    id: {
        type: Sequelize.INTEGER,        
        primaryKey: true,        
    },
    categories: {
        type: Sequelize.STRING,
        allowNull: false
    },
    release: {
        type: Sequelize.DATE,
        allowNull: false
    },
    director: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
  }, {
    timestamps: false
});

module.exports = model;