/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-unresolved
import { sequelize } from '../database/connection';

const Sequelize = require('sequelize');

const Posts = require('./posts.ts');

const UserVotes = require('./user_votes.ts');

const User = sequelize.define('User', {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  name: Sequelize.STRING(200),

  surname: Sequelize.STRING(200),

  username: {
    type: Sequelize.STRING(45),
    allowNull: false,
  },

  role: {
    type: Sequelize.STRING(45),
    allowNull: false,
  },

  phoneNumber: Sequelize.STRING(45),
  subscribedUntil: Sequelize.DATE,
});

User.belongsTo(Posts, {
  foreignKey: 'id',
  as: 'post',
});

User.belongsTo(UserVotes, {
  foreignKey: 'id',
  as: 'uservote',
});
