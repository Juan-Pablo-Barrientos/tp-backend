import express from "express";
const router = express.Router();
import * as pollsControllers from "../controllers/pollsControllers";

router.post("/", pollsControllers.addPolls);
router.get("/:id",pollsControllers.getPollsById);
router.get("/",pollsControllers.getAllPolls);
router.patch("/:id", pollsControllers.updatePolls);
router.delete("/:id", pollsControllers.deletePolls);
export default router;