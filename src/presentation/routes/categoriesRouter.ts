import express from "express";
import * as categoriesController from "../controllers/categoriesController";
const router = express.Router();

router.get("/:id", categoriesController.getCategoriesById);
router.get("/", categoriesController.getAllCategories);
router.post("/", categoriesController.addCategories);
router.delete("/:id", categoriesController.deleteCategories);
router.put("/:id", categoriesController.updateCategories);
export default router;
