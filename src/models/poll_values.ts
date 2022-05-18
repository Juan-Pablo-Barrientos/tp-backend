/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-unresolved
import { sequelize } from '../database/connection';

const Sequelize = require('sequelize');

exports = sequelize.define('PollValues', {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  pollId: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
  },

  description: Sequelize.STRING(200),
});
