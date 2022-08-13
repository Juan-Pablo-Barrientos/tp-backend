import express from "express";
const router = express.Router();

import * as navigationController from "../../controllers/Navigation/index"

router.get("/home", navigationController.homeRender)
router.get("/posts/show/:id", navigationController.postsShow)
router.get("/posts/edit/:id", navigationController.postsEdit)
router.get("/create", navigationController.create)

export default router