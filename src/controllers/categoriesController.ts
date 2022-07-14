// eslint-disable-next-line import/extensions
import * as models from '../models/index';

// eslint-disable-next-line consistent-return
const getCategoriesById = async (req: any, res: any) => {
  try {
    const getCategoriesById = req.params.id;   
    const response = await models.Categories.findByPk(getCategoriesById);
    if (response != null) {
      return res.status(200).json({ data: response, error: false });
    // eslint-disable-next-line brace-style
    }
    // eslint-disable-next-line no-else-return
    else {
      return res.status(404).json({ msg: `Category value not found.`, error: true });
    }
  } catch (error) {
    return res.status(500).json({ msg: error, error: true });
  }
};
const addCategories = async (req: any , res: any) => {
    try {
        const name = req.body.name;
        if (!name) {
            return res.status(400).json({ msg: "name field is required.", error: true });
        }     
        const pollValueInstance = models.Categories.build(req.body);
        await pollValueInstance.save();
        res.status(200).json({ data: pollValueInstance, error: false });
  
    } catch (error) {
        return res.status(500).json({ msg: error, error: true });
    }
  
  }
  export {addCategories, getCategoriesById}