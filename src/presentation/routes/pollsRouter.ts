import express from "express";
import * as pollsControllers from "../controllers/pollsControllers";
const router = express.Router();

router.post("/", pollsControllers.addPolls);
router.get("/:id", pollsControllers.getPollsById);
router.get("/today/poll", pollsControllers.getTodaysPoll);
router.get("/", pollsControllers.getAllPolls);
router.put("/:id", pollsControllers.updatePolls);
router.delete("/:id", pollsControllers.deletePolls);
export default router;
