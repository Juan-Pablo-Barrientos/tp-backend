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
});/*
Categories.hasMany(Posts);
Categories.hasMany(Polls);*/
export default Categories;