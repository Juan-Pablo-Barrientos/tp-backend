import { DataTypes } from 'sequelize';
import sequelizeORM from '../database/connection';

import Polls from "./polls";
import Posts from "./posts";

const Categories = sequelizeORM.define('Categories', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  name: DataTypes.STRING(200),
});
Categories.hasMany(Posts,{
  foreignKey:'categoryId'
});
Categories.hasMany(Polls,{
  foreignKey:'categoryId'
});
export default Categories;