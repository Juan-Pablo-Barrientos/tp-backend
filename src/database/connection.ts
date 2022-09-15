// eslint-disable-next-line import/no-unresolved
import { Sequelize } from 'sequelize';
import dotenv from "dotenv"

dotenv.config();

// eslint-disable-next-line import/prefer-default-export
const sequelizeORM = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASS!, { host: process.env.DB_HOST, dialect: 'mysql', define: {
    timestamps: false
}});
export default sequelizeORM;
// eslint-disable-next-line import/prefer-default-export
