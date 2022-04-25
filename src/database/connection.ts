const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('prueba', 'JuanPabloBarrientos', 'password', { host: 'localhost', dialect: 'mysql' });
module.exports = sequelize;
global.sequelize = sequelize;
