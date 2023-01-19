const Sequelize = require('sequelize');

const sequelize = new Sequelize('groupchatapp', 'root', '12345abhi',{
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;