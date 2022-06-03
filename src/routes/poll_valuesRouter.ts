import express from "express";
const router = express.Router();
import * as poll_valuesController from "../controllers/poll_valuesControllers";

router.get("/:id", poll_valuesController.addPollValues);
router.post("/", poll_valuesController.getPollValuesById);

export default router;