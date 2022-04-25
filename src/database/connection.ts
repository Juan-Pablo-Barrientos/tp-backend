// eslint-disable-next-line import/no-unresolved
import { Sequelize } from 'sequelize/types';

const sequelize = new Sequelize('prueba', 'JuanPabloBarrientos', 'password', { host: 'localhost', dialect: 'mysql' });
// eslint-disable-next-line import/prefer-default-export
export { sequelize };
