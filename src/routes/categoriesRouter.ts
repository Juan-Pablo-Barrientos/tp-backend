import express from "express";
const router = express.Router();
import categoriesController from "../controllers/categoriesController";

router.get("/", categoriesController.getCategories);
router.post("/", categoriesController.addCaregories);

export default router;