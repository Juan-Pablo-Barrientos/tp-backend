import express from "express";
const router = express.Router();
import * as postsControllers from "../controllers/postsControllers";

router.put("/", postsControllers.addPosts);
router.get("/:id",postsControllers.getPostsById);
router.get("/",postsControllers.getAllPosts);
router.patch("/:id", postsControllers.updatePosts);
router.delete("/:id", postsControllers.deletePosts);
router.get("/withAuthor/:id",postsControllers.getPostsByIdWithAuthor);
export default router;