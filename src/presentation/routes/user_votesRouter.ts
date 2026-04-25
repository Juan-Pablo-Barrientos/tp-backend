import express from "express";
import * as user_votesControllers from "../controllers/user_votesControllers";
const router = express.Router();

router.post("/", user_votesControllers.addUserVotes);
router.post("/getOne", user_votesControllers.getUserVotesById);
router.get("/", user_votesControllers.getAllUserVotes);
router.patch("/:id", user_votesControllers.updateUserVotes);
router.delete("/:id", user_votesControllers.deleteUserVotes);

export default router;
