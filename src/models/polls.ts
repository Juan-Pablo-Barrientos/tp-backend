import { DataTypes } from 'sequelize';
import sequelizeORM from '../database/connection';

import Categories from './categories';
import PollValues from './poll_values';
import UserVotes from './user_votes';

const Polls = sequelizeORM.define('Polls', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  categotyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },

  description: DataTypes.STRING(200),
});
Polls.hasMany(PollValues,{
  foreignKey:'pollId'
});
Polls.hasMany(UserVotes,{
  foreignKey:'pollId'
});

Polls.belongsTo(Categories);
export default Polls;