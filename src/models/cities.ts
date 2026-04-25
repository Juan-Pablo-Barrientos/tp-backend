import { DataTypes } from "sequelize";
import sequelizeORM from "../infrastructure/connection";
import Provinces from "./provinces";

const Cities = sequelizeORM.define("Cities", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  name: { type: DataTypes.STRING(200), allowNull: false },
});

Provinces.hasMany(Cities);
Cities.belongsTo(Provinces);

export default Cities;
