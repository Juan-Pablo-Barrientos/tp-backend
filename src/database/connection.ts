// eslint-disable-next-line import/no-unresolved
import { Sequelize } from 'sequelize/types';

// eslint-disable-next-line import/prefer-default-export
const sequelizeORM = new Sequelize('prueba', 'JuanPabloBarrientos', 'password', { host: 'localhost', dialect: 'mysql' });
export default sequelizeORM;
// eslint-disable-next-line import/prefer-default-export
