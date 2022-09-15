import { DataTypes } from 'sequelize';
import sequelizeORM from '../database/connection';

import Polls from "./polls";

const PollValues = sequelizeORM.define('poll_values', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  description: DataTypes.STRING(200),
},
{
  paranoid: true,
  deletedAt: 'destroyTime'
  }
);

Polls.hasMany(PollValues);
PollValues.belongsTo(Polls);
export default PollValues;