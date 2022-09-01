import { DataTypes } from 'sequelize';
import sequelizeORM from '../database/connection';

const Provinces = sequelizeORM.define('province', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  name: DataTypes.STRING(200),
});
export default Provinces;
