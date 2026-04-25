import express from "express";
import * as provincesControllers from "../controllers/provincesControllers";
const router = express.Router();

router.get("/:id", provincesControllers.getProvincesById);
router.get("/", provincesControllers.getAllProvinces);
router.post("/", provincesControllers.addProvinces);
router.put("/:id", provincesControllers.updateProvinces);
router.delete("/:id", provincesControllers.deleteProvinces);

export default router;
