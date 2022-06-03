import express from "express";
const router = express.Router();
import * as userControllers from "../controllers/userControllers";

router.post("/", userControllers.addUser);
router.get("/:id",userControllers.getUserById);
router.get("/",userControllers.getAllUser);
router.put("/:id", userControllers.updateUser);
router.delete("/:id", userControllers.deleteUser);
export default router;