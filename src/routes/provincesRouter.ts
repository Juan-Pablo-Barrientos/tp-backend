import express from "express";
const router = express.Router();
import * as provincesControllers from "../controllers/provincesControllers";

router.get("/:id", provincesControllers.getProvincesById);
router.get("/", provincesControllers.getAllProvinces);
router.post("/", provincesControllers.addProvinces);
router.put("/:id", provincesControllers.updateProvinces);
router.delete("/:id", provincesControllers.deleteProvinces);

export default router;