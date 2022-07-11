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

  title: DataTypes.STRING(200),

  body: DataTypes.TEXT,

  requiresSubscription: DataTypes.BOOLEAN,
});
Categories.hasMany(Posts);
Provinces.hasMany(Posts);
User.hasMany(Posts);

Posts.belongsTo(User);
Posts.belongsTo(Provinces);
Posts.belongsTo(Categories);

export default Posts;