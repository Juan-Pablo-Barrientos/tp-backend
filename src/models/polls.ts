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
  description: DataTypes.STRING(200),
});

Categories.hasMany(Polls);
Polls.belongsTo(Categories);
export default Polls;