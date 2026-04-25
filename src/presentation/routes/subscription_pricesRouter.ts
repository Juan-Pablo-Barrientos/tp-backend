import express from "express";
import * as subscription_pricesControllers from "../controllers/subscription_pricesControllers";
const router = express.Router();

router.get("/:effectiveDate", subscription_pricesControllers.getPriceByDate);
router.post("/", subscription_pricesControllers.addPrice);

export default router;
