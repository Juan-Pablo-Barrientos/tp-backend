/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-unresolved
import { sequelize } from '../database/connection';

const Sequelize = require('sequelize');

exports = sequelize.define('user_votes', {
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

  pollValueId: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
  },
});
