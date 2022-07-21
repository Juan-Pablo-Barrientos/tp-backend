import express from "express";
const router = express.Router();
import * as poll_valuesController from "../controllers/poll_valuesControllers";

router.get("/:id", poll_valuesController.getPollValuesById);
router.put("/", poll_valuesController.addPollValues);

export default router;