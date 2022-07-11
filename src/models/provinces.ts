import { DataTypes } from 'sequelize';
import sequelizeORM from '../database/connection';

import Posts from './posts';

const Provinces = sequelizeORM.define('Province', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  name: DataTypes.STRING(200),
});
export default Provinces;
