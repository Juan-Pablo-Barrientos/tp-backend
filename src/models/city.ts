import { DataTypes } from "sequelize";
import sequelizeORM from "../database/connection";
import Provinces from "./provinces";

const City = sequelizeORM.define("City", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  name: { type: DataTypes.STRING(200), allowNull: false }});

Provinces.hasMany(City);
City.belongsTo(Provinces);

export default City;
