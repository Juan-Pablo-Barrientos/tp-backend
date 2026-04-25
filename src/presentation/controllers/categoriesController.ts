import { Request, Response } from "express";
import { MessageResponse } from "../../auth/responses/Message.response";
import { IdParams } from "../../contracts/common/id_param";
import * as models from "../../models/index";
import { ErrorHelper } from "../../core/helpers/error.helper";
import { getAllCategoriesRequest } from "../../contracts/requests/categories/getAllCategories.request";

const getCategoriesById = async (req: Request<IdParams>, res: Response<MessageResponse<unknown>>) => {
  try {
    const categoriesID = req.params.id;
    const response = await models.Categories.findByPk(categoriesID);
    if (response != null) {
      return res.status(200).json(MessageResponse.Ok(response));
    } else {
      return res.status(404).json(MessageResponse.Error("Category not found."));
    }
  } catch (error) {
    return res.status(500).json(ErrorHelper.Handle(error));
  }
};

const getAllCategories = async (req: Request, res: Response<MessageResponse<unknown>>) => {
  try {
    const response = await models.Categories.findAll();
    return res.status(200).json(MessageResponse.Ok(response));
  } catch (error) {
    return res.status(500).json(ErrorHelper.Handle(error));
  }
};

const addCategories = async (req: Request<getAllCategoriesRequest>, res: Response<MessageResponse<unknown>>) => {
  try {
    const name = req.body.name;

    if (!name) {
      return res
        .status(400)
        .json({ msg: "name field is required.", error: true });
    }
    const categoryInstance = models.Categories.build(req.body);
    await categoryInstance.save();
    return res.status(200).json(MessageResponse.Ok(categoryInstance));
  } catch (error) {
    return res.status(500).json(ErrorHelper.Handle(error));
  }
};

const updateCategories = async (req: Request<IdParams>, res: Response<MessageResponse<unknown>>) => {
  try {
    const categoriesID = req.params.id;
    const category = await models.Categories.findByPk(categoriesID);

    if (category) {
      category.set(req.body);
      await category.save();
      return res.status(200).json(MessageResponse.Ok(category));
    } else {
      return res.status(404).json(MessageResponse.Error("Category not found."));
    }
  } catch (error) {
    return res.status(500).json(ErrorHelper.Handle(error));
  }
};

const deleteCategories = async (req: Request<IdParams>, res: Response<MessageResponse<unknown>>) => {
  try {
    const categoriesID = req.params.id;
    const category = await models.Categories.findByPk(categoriesID);
    if (category) {
      await category.destroy();
      return res.status(200).json(MessageResponse.Ok(category));
    } else {
      return res.status(404).json(MessageResponse.Error("Category not found."));
    }
  } catch (error) {
    return res.status(500).json(ErrorHelper.Handle(error));
  }
};
export {
  addCategories,
  deleteCategories,
  getAllCategories,
  getCategoriesById,
  updateCategories,
};
