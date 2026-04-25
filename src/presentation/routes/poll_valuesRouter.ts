import express from "express";
import * as poll_valuesController from "../controllers/poll_valuesControllers";
const router = express.Router();

router.get("/:id", poll_valuesController.getPollValuesById);
router.post("/", poll_valuesController.addPollValues);

export default router;
