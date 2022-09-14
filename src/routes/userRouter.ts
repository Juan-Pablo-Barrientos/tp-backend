import express from "express";
const router = express.Router();
import * as userControllers from "../controllers/userControllers";

router.post("/", userControllers.addUser);
router.get("/:id",userControllers.getUserById);
router.get("/:username/exists",userControllers.userExist)
router.get("/:email/existemail",userControllers.emailExist)
router.get("/:id/posts",userControllers.getUserByIdWithPosts);
router.get("/",userControllers.getAllUser);
router.patch("/:id", userControllers.updateUser);
router.delete("/:id", userControllers.deleteUser);
router.post("/login", userControllers.login);
export default router;