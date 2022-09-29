import { Sequelize } from 'sequelize';
import dotenv from "dotenv"

dotenv.config();

const sequelizeORM = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASS!, { host: process.env.DB_HOST, dialect: 'mysql', 
define: {
    createdAt: false, 
    updatedAt: false
},
    dialectOptions: {
       // useUTC: false, //for reading from database
      dateStrings: true,
      typeCast: function (field: { type: string; string: () => any; }, next: () => any) { // for reading from database
        if (field.type === 'DATETIME') {
          return field.string()
        }
          return next()
        },
    },
    timezone: '+00:00'
    
});
export default sequelizeORM;
