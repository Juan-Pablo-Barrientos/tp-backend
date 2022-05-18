/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-unresolved
import { sequelize } from '../database/connection';

const Sequelize = require('sequelize');

const Categories = require('./categories.ts');

const PollValues = require('./poll_values.ts');

const UserVotes = require('./user_votes.ts');

const Polls = sequelize.define('Polls', {
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

Polls.hasMany(Categories, { as: 'category' });

Polls.belongsTo(PollValues, {
  foreignKey: 'id',
  as: 'poll',
});

Polls.belongsTo(UserVotes, {
  foreignKey: 'id',
  as: 'uservote',
});
