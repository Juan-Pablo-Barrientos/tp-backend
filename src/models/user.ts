import { DataTypes } from 'sequelize';
import sequelizeORM from '../database/connection';

import Posts from './posts';
import UserVotes from './user_votes';

const User = sequelizeORM.define('User', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  name: DataTypes.STRING(200),

  surname: DataTypes.STRING(200),

  username: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },

  role: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },

  phoneNumber: DataTypes.STRING(45),
  subscribedUntil: DataTypes.DATE,
});

User.belongsTo(Posts, {
  foreignKey: 'id',
  as: 'post',
});

User.belongsTo(UserVotes, {
  foreignKey: 'id',
  as: 'uservote',
});

export default User;
