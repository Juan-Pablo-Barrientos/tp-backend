import express from "express";
const router = express.Router();
import * as postsControllers from "../controllers/postsControllers";
const multer = require('multer');
const upload = multer({dest:'public/images',limits: { fieldSize: 50 * 1024 * 1024 }});
const multerConfig = upload.fields([{name: 'myImage', maxCount: 1}])


router.post("/", multerConfig, postsControllers.addPosts);
router.get("/mostClicked",postsControllers.getMostClickedPosts)
router.get("/:id",postsControllers.getPostsById);
router.get("/",postsControllers.getAllPosts);
router.put("/:id",multerConfig, postsControllers.updatePosts);
router.delete("/:id", postsControllers.deletePosts);
router.get("/:id/autor",postsControllers.getPostsByIdWithAuthor);
export default router;