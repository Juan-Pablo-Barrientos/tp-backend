import express from "express";
const router = express.Router();
import userControllers from "../controllers/userControllers";

router.get("/", userControllers.getCategories);
router.post("/", userControllers.addCaregories);

export default router;