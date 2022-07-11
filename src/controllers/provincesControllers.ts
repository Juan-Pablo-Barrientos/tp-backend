// eslint-disable-next-line import/extensions
import * as models from '../models/index';
import { getAllCities } from './cityController';

// eslint-disable-next-line consistent-return
const getProvincesById = async (req: any, res: any) => {
  try {
    const ProvinceID = req.params.id;   
    const response = await models.Provinces.findByPk(ProvinceID);
    if (response != null) {
      return res.status(200).json({ data: response, error: false });
    // eslint-disable-next-line brace-style
    }
    // eslint-disable-next-line no-else-return
    else {
      return res.status(404).json({ msg: `Province not found.`, error: true });
    }
  } catch (error) {
    return res.status(500).json({ msg: error, error: true });
  }
};

const addProvinces = async (req: any , res: any) => {
    try {
        const name = req.body.name;

        if (!name) {
          return res.status(400).json({ msg: "name field is required.", error: true });
      }       
        const ProvinceInstance = models.Provinces.build(req.body);
        await ProvinceInstance.save();
        res.status(200).json({ data: ProvinceInstance, error: false });
  
    } catch (error) {
        return res.status(500).json({ msg: error, error: true });
    } 

  }

  const getAllProvinces = async (req:any, res:any) => {
    try {
        const response = await models.Provinces.findAll({include:models.City});
        return res.status(200).json({ data: response, error: false });
    } catch (error) {
        return res.status(500).json({ msg: error, error: true });
    }
  };
  export { addProvinces,getProvincesById,getAllProvinces}