import express from "express";
const router = express.Router();
import * as userControllers from "../controllers/userControllers";

router.get("/", userControllers.getAllUser);

export default router;