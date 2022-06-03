import express from "express";
const router = express.Router();
import * as provincesControllers from "../controllers/provincesControllers";

router.get("/:id", provincesControllers.getProvincesById);
router.post("/", provincesControllers.addProvinces);

export default router;