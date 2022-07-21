import express from "express";
const router = express.Router();
import * as categoriesController from "../controllers/categoriesController";

router.get("/:id", categoriesController.getCategoriesById);
router.put("/", categoriesController.addCategories);
export default router;