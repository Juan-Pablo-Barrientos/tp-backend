import { DataTypes } from 'sequelize';
import sequelizeORM from '../database/connection';

const SubscriptionPrices = sequelizeORM.define('SubscriptionsPrices', {
  effectiveDate: {
    type: DataTypes.DATE,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  price: DataTypes.DECIMAL(10, 2),
});
export default SubscriptionPrices;
