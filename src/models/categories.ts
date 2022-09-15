import { DataTypes } from 'sequelize';
import sequelizeORM from '../database/connection';

const Categories = sequelizeORM.define('categories', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  
  name: DataTypes.STRING(200),
  
},
 {
  paranoid: true,
  deletedAt: 'destroyTime'
  }
);
export default Categories;