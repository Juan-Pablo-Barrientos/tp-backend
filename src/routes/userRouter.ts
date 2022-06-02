import express from "express";
const router = express.Router();
import * as userControllers from "../controllers/userControllers";

router.post("/", userControllers.getUserById);
router.get("/",userControllers.getUserById)
export default router;