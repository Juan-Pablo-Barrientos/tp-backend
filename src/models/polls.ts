/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-unresolved
import { sequelize } from '../database/connection';

const Sequelize = require('sequelize');

exports = sequelize.define('polls', {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  categotyId: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
  },

  description: Sequelize.STRING(200),
});
