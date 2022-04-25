/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-unresolved
import { sequelize } from '../database/connection';

const Sequelize = require('sequelize');

exports = sequelize.define('subscriptions_prices', {
  effectiveDate: {
    type: Sequelize.DATE,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  price: Sequelize.DECIMAL(10, 2),
});
