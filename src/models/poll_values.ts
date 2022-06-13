import { DataTypes } from 'sequelize';
import sequelizeORM from '../database/connection';

import Polls from "./polls";
import UserVotes from "./user_votes";

const PollValues = sequelizeORM.define('PollValues', {
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

  description: DataTypes.STRING(200),
});
PollValues.hasMany(UserVotes,{
  foreignKey:'pollValueId'
});
PollValues.belongsTo(Polls);
export default PollValues;