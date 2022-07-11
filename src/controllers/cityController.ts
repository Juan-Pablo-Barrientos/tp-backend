// eslint-disable-next-line import/extensions
import sequelizeORM from '../database/connection';
import * as models from '../models/index';

const getAllCities = async (req:any, res:any) => {
    try {
        const response = await models.City.findAll({
         include:models.Provinces

 });

        return res.status(200).json({ data: response, error: false });
    } catch (error) {
        return res.status(500).json({ msg: error, error: true });
    }
  };
  export {getAllCities}