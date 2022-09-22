import sequelizeORM from "../database/connection";
import * as models from "../models/index";

const getCitiesById = async (req: any, res: any) => {
  try {
    const citiesID = req.params.id;
    const response = await models.Cities.findByPk(citiesID);
    if (response != null) {
      return res.status(200).json({ data: response, error: false });
    }
    else {
      return res.status(404).json({ msg: `City not found.`, error: true });
    }
  } catch (error) {
    return res.status(500).json({ msg: error, error: true });
  }
};

const getAllCities = async (req: any, res: any) => {
  try {
    const response = await models.Cities.findAll();
    return res.status(200).json({ data: response, error: false });
  } catch (error) {
    return res.status(500).json({ msg: error, error: true });
  }
};

const addCities = async (req: any, res: any) => {
  try {
    const name = req.body.name;
    const provinceId = req.body.provinceId;

    if (!name) {
      return res.status(400).json({ msg: "name field is required.", error: true });
    }
    if (!provinceId) {
      return res.status(400).json({ msg: "provinceId field is required.", error: true });
    }
    const cityInstance = models.Cities.build(req.body);
    await cityInstance.save();
    res.status(200).json({ data: cityInstance, error: false });
  } catch (error) {
    return res.status(500).json({ msg: error, error: true });
  }
};
const updateCities = async (req: any, res: any) => {
  try {
    const citiesID = req.params.id;
    const cityInstance = await models.Cities.findByPk(citiesID);

    if (cityInstance) {
      cityInstance.set(req.body);
      await cityInstance.save();
      res.status(200).json({ data: cityInstance, error: false });
    } else {
      res.status(404).json({ msg: "City not found", error: true });
    }
  } catch (error) {
    return res.status(500).json({ msg: error, error: true });
  }
};

const deleteCities = async (req: any, res: any) => {
  try {
    const citiesID = req.params.id;
    const cityInstance = await models.Cities.findByPk(citiesID);
    if (cityInstance) {
      await cityInstance.destroy();
      res
        .status(200)
        .json({
          data: cityInstance,
          error: false,
          msg: "City deleted successfully.",
        });
    } else {
      res.status(404).json({ msg: "City not found", error: true });
    }
  } catch (error) {
    return res.status(500).json({ msg: error, error: true });
  }
};
export { updateCities, deleteCities, addCities, getCitiesById, getAllCities };
