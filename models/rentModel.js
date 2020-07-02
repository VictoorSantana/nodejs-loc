const Sequelize = require('sequelize');
const db = require('../props/connection');


const model = db.define('tb_rented_movies', {    
    id: {
        type: Sequelize.STRING,        
        primaryKey: true,
    },
    id_client: {
        type: Sequelize.STRING,
        allowNull: false
    },
    id_movie: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
  }, {
    timestamps: false
});

module.exports = model;