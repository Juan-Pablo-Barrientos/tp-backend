/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-unresolved
import { sequelize } from '../database/connection';

const Sequelize = require('sequelize');

exports = sequelize.define('posts', {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  userId: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
  },

  categotyId: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
  },
  provinceId: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
  },

  title: Sequelize.STRING(200),

  body: Sequelize.TEXT,

  requiresSubscription: Sequelize.BOOLEAN,
});
