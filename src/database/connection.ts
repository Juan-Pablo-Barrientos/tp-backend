// eslint-disable-next-line import/no-unresolved
import { Sequelize } from 'sequelize';

// eslint-disable-next-line import/prefer-default-export
const sequelizeORM = new Sequelize('newspaper', 'JuanPabloBarrientos', 'password', { host: 'localhost', dialect: 'mysql', define: {
    timestamps: false
}});
export default sequelizeORM;
// eslint-disable-next-line import/prefer-default-export
