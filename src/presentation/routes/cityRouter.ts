import express from "express";
import * as cityController from "../controllers/cityController";
const router = express.Router();

router.get("/", cityController.getAllCities);

export default router;
