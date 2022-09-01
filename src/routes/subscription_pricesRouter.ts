import express from "express";
const router = express.Router();
import * as subscription_pricesControllers from "../controllers/subscription_pricesControllers";

router.get("/:effectiveDate", subscription_pricesControllers.getPriceByDate);
router.post("/", subscription_pricesControllers.addPrice);

export default router;