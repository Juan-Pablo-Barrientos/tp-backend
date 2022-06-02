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
  foreignKey:'pollId',
  as:'pollValue'
});
Polls.hasMany(UserVotes,{
  foreignKey:'pollId'
});

PollValues.belongsTo(Categories);
export default Polls;
/*
Polls.hasMany(Categories, { as: 'category' });

Polls.belongsTo(PollValues, {
  foreignKey: 'id',
  as: 'poll',
});


Polls.belongsTo(UserVotes, {
  foreignKey: 'id',
  as: 'uservote',
});
*/