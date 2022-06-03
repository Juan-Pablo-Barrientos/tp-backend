import express from "express";
const router = express.Router();
import * as postsControllers from "../controllers/postsControllers";

router.post("/", postsControllers.addPosts);
router.get("/:id",postsControllers.getPostsById);
router.get("/",postsControllers.getAllPosts);
router.put("/:id", postsControllers.updatePosts);
router.delete("/:id", postsControllers.deletePosts);

export default router;