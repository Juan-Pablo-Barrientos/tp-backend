/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-unresolved
import { sequelize } from '../database/connection';

const Sequelize = require('sequelize');

const Polls = require('./polls.ts');

const Posts = require('./posts.ts');

const Categories = sequelize.define('Categories', {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  name: Sequelize.STRING(200),
});

Categories.belongsTo(Polls, {
  foreignKey: 'id',
  as: 'poll',
});

Categories.belongsTo(Posts, {
  foreignKey: 'id',
  as: 'post',
});
