import { DataTypes } from 'sequelize';
import sequelizeORM from '../database/connection';

import User from './user';
import Polls from './polls';
import PollValues from './poll_values';

const UserVotes = sequelizeORM.define('UserVotes', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  pollId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },

  pollValueId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
});
UserVotes.belongsTo(User,{
  foreignKey:'id',
  as:'user'
});
UserVotes.belongsTo(Polls,{
  foreignKey:'id',
  as:'poll'
});
UserVotes.belongsTo(PollValues,{
  foreignKey:'id',
  as:'pollValue'
});

export default UserVotes;
/*
UserVotes.hasMany(User, { as: 'user' });

UserVotes.hasMany(Polls, { as: 'poll' });

UserVotes.hasMany(PollValues, { as: 'pollvalue' });
*/