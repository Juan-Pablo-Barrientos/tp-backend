import express from "express";
const router = express.Router();

import * as weatherController from "../../controllers/Navigation/index"

router.get("/home", weatherController.homeRender)
router.get("/posts/show/:id", weatherController.postsShow)
router.get("/posts/edit/:id", weatherController.postsEdit)
router.get("/create", weatherController.create)
router.get("/", weatherController.weatherApiKey)
router.get("/currentWeather", weatherController.getCurrentWeather)
router.get("/forecast", weatherController.getForecast)

export default router