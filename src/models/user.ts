import { DataTypes } from 'sequelize';
import sequelizeORM from '../database/connection';

const User = sequelizeORM.define('users', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  email: DataTypes.STRING(200),
  
  name: DataTypes.STRING(200),

  surname: DataTypes.STRING(200),
  postPermission: DataTypes.BOOLEAN,

  username: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },

  role: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },

  phoneNumber: DataTypes.STRING(45),

  subscribedUntil: {
    type: DataTypes.DATE,
    allowNull: true
  },
  
  bio:DataTypes.TEXT
});
export default User;
