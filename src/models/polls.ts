import { DataTypes } from 'sequelize';
import sequelizeORM from '../database/connection';

import Categories from './categories';

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