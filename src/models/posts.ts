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
  path_img: DataTypes.STRING,
  clicks: DataTypes.NUMBER,
  postDate: DataTypes.DATE
},
{
  paranoid: true,
  deletedAt: 'destroyTime'
  }
);
Categories.hasMany(Posts);
Provinces.hasMany(Posts);
User.hasMany(Posts);

Posts.belongsTo(Provinces);
Posts.belongsTo(Categories);
Posts.belongsTo(User);

export default Posts;