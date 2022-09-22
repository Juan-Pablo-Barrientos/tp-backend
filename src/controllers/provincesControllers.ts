// eslint-disable-next-line import/extensions
import * as models from '../models/index';
import { getAllCities } from './cityController';

// eslint-disable-next-line consistent-return
const getProvincesById = async (req: any, res: any) => {
  try {
    const provincesID = req.params.id;   
    const response = await models.Provinces.findByPk(provincesID);
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

const getAllProvinces = async (req:any, res:any) => {
  try {
      const response = await models.Provinces.findAll();
      return res.status(200).json({ data: response, error: false });
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
      const provinceInstance = models.Provinces.build(req.body);
      await provinceInstance.save();
      res.status(200).json({ data: provinceInstance, error: false });

  } catch (error) {
      return res.status(500).json({ msg: error, error: true });
  }

}
const updateProvinces = async (req: any , res: any) => {
  try {
      const provincesID = req.params.id;
      const province = await models.Provinces.findByPk(provincesID);
      
      if (province) {
        province.set(req.body);
        await province.save();
        res.status(200).json({ data: province, error: false });
      }
      else {
          res.status(404).json({ msg: 'Province not found', error: true });
      }
  } catch (error) {
      return res.status(500).json({ msg: error, error: true });
  }
}

const deleteProvinces = async (req: any , res: any) => {
  try {
      const provincesID = req.params.id;
      const province = await models.Provinces.findByPk(provincesID);
      if (province) {
          await province.destroy();
          res.status(200).json({ data: province, error: false, msg: "Province deleted successfully." });         
      } else {
          res.status(404).json({ msg: 'Province not found', error: true });
      }
  } catch (error) {
      return res.status(500).json({ msg: error, error: true });
  }
}
  export {updateProvinces, deleteProvinces, addProvinces, getProvincesById, getAllProvinces}