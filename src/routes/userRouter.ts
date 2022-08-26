import express from "express";
const router = express.Router();
import * as userControllers from "../controllers/userControllers";

router.put("/", userControllers.addUser);
router.get("/:id",userControllers.getUserById);
router.get("/userExist/:username",userControllers.userExist)
router.get("/withPosts/:id",userControllers.getUserByIdWithPosts);
router.get("/",userControllers.getAllUser);
router.patch("/:id", userControllers.updateUser);
router.delete("/:id", userControllers.deleteUser);
export default router;