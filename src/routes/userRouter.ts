import express from "express";
const router = express.Router();
import * as userControllers from "../controllers/userControllers";

router.get("/:id", userControllers.getUserById);

export default router;