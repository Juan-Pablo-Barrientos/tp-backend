import { DataTypes } from 'sequelize';
import sequelizeORM from '../database/connection';

const SubscriptionPrices = sequelizeORM.define('subscriptions_prices', {
  effectiveDate: {
    type: DataTypes.DATE,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  price: DataTypes.DECIMAL(10, 2),
},
{
  paranoid: true,
  deletedAt: 'destroyTime'
  }
);
export default SubscriptionPrices;
