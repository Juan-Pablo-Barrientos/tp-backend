/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-unresolved
import { sequelize } from '../database/connection';

const Sequelize = require('sequelize');

const Categories = require('./categories.ts');

const Provinces = require('./provinces.ts');

const User = require('./user.ts');

const Posts = sequelize.define('Posts', {
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

Posts.hasMany(Categories, { as: 'category' });

Posts.hasMany(Provinces, { as: 'province' });

Posts.hasMany(User, { as: 'user' });
