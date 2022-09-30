import express from "express";
const router = express.Router();
import * as userControllers from "../controllers/userControllers";

router.post("/", userControllers.addUser);
router.put("/password/change", userControllers.changePassword);
router.get("/:id",userControllers.getUserById);
router.get("/:username/exists",userControllers.userExist)
router.get("/:email/existemail",userControllers.emailExist)
router.get("/:id/posts",userControllers.getUserByIdWithPosts);
router.get("/",userControllers.getAllUser);
router.put("/:id", userControllers.updateUser);
router.delete("/:id", userControllers.deleteUser);
router.post("/login", userControllers.login);
export default router;