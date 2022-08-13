// eslint-disable-next-line import/no-unresolved
import { Sequelize } from 'sequelize';
import dotenv from "dotenv"

dotenv.config();

// eslint-disable-next-line import/prefer-default-export
const sequelizeORM = new Sequelize(process.env.DATABASENAME!, process.env.DATABASEUSERNAME!, process.env.DATABASEPASSWORD!, { host: 'localhost', dialect: 'mysql', define: {
    timestamps: false
}});
export default sequelizeORM;
// eslint-disable-next-line import/prefer-default-export
