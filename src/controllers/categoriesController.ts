// eslint-disable-next-line import/extensions
import * as models from '../models/index';

// eslint-disable-next-line consistent-return
const getCategoriesById = async (req: any, res: any) => {
  try {
    const categoriesID = req.params.id;   
    const response = await models.Categories.findByPk(categoriesID);
    if (response != null) {
      return res.status(200).json({ data: response, error: false });
    // eslint-disable-next-line brace-style
    }
    // eslint-disable-next-line no-else-return
    else {
      return res.status(404).json({ msg: `Category not found.`, error: true });
    }
  } catch (error) {
    return res.status(500).json({ msg: error, error: true });
  }
};

const getAllCategories = async (req:any, res:any) => {
  try {
      const response = await models.Categories.findAll();
      return res.status(200).json({ data: response, error: false });
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
      const categoryInstance = models.Categories.build(req.body);
      await categoryInstance.save();
      res.status(200).json({ data: categoryInstance, error: false });

  } catch (error) {
      return res.status(500).json({ msg: error, error: true });
  }

}
const updateCategories = async (req: any , res: any) => {
  try {
      const categoriesID = req.params.id;
      const category = await models.Categories.findByPk(categoriesID);
      
      if (category) {
        category.set(req.body);
        await category.save();
        res.status(200).json({ data: category, error: false });
      }
      else {
          res.status(404).json({ msg: 'Category not found', error: true });
      }
  } catch (error) {
      return res.status(500).json({ msg: error, error: true });
  }
}

const deleteCategories = async (req: any , res: any) => {
  try {
      const categoriesID = req.params.id;
      const category = await models.Categories.findByPk(categoriesID);
      if (category) {
          await category.destroy();
          res.status(200).json({ data: category, error: false, msg: "Category deleted successfully." });         
      } else {
          res.status(404).json({ msg: 'Category not found', error: true });
      }
  } catch (error) {
      return res.status(500).json({ msg: error, error: true });
  }
}
  export {updateCategories, deleteCategories, addCategories, getCategoriesById, getAllCategories}