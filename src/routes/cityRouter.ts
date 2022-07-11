import express from "express";
const router = express.Router();
import * as cityController from "../controllers/cityController";

router.get("/", cityController.getAllCities);

export default router;