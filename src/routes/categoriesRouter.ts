import express from "express";
const router = express.Router();
import * as categoriesController from "../controllers/categoriesController";

router.get("/:id", categoriesController.getCategoriesById);
router.get("/", categoriesController.getAllCategories);
router.post("/", categoriesController.addCategories);
export default router;