import express from "express";
const router = express.Router();
import * as provincesControllers from "../controllers/provincesControllers";

router.get("/:id", provincesControllers.getProvincesById);
router.get("/", provincesControllers.getAllProvinces);
router.put("/", provincesControllers.addProvinces);

export default router;