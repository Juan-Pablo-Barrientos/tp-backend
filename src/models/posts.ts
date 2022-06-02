import { DataTypes } from 'sequelize';
import sequelizeORM from '../database/connection';

import Categories from './categories';
import Provinces from './provinces';
import User from './user';

const Posts = sequelizeORM.define('Posts', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  categotyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  provinceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  title: DataTypes.STRING(200),

  body: DataTypes.TEXT,

  requiresSubscription: DataTypes.BOOLEAN,
});
Posts.belongsTo(User);
Posts.belongsTo(Categories);
Posts.belongsTo(Provinces);
export default User;
/*
Posts.hasMany(Categories, { as: 'category' });

Posts.hasMany(Provinces, { as: 'province' });

Posts.hasMany(User, { as: 'user' });
*/