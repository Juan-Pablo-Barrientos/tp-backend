/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-unresolved
import { sequelize } from '../database/connection';

const Sequelize = require('sequelize');

const User = require('./user.ts');

const Polls = require('./polls.ts');

const PollValues = require('./poll_values.ts');

const UserVotes = sequelize.define('UserVotes', {
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

UserVotes.hasMany(User, { as: 'user' });

UserVotes.hasMany(Polls, { as: 'poll' });

UserVotes.hasMany(PollValues, { as: 'pollvalue' });
