const Sequelize = require('sequelize');
const sequelize = require('../database/connection');

module.exports = sequelize.define('tweet', {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: Sequelize.INTEGER(11),
  content: Sequelize.STRING(300),
});
