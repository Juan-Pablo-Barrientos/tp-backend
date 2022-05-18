/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-unresolved
import { sequelize } from '../database/connection';

const Sequelize = require('sequelize');

const Posts = require('./posts.ts');

const Provinces = sequelize.define('Provinces', {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  name: Sequelize.STRING(200),
});

Provinces.belongsTo(Posts, {
  foreignKey: 'id',
  as: 'post',
});
