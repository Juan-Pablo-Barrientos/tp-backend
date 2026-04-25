import express from "express";
import { authenticateJWT } from "../../auth/middlewares/authenticateJWT.middleware";
import { authorizeRoles } from "../../auth/middlewares/authorize.middleware";
import * as userControllers from "../controllers/userControllers";
const router = express.Router();
const multer = require("multer");
const upload = multer({
  dest: "public/images",
  limits: { fieldSize: 50 * 1024 * 1024 },
});
const multerConfig = upload.fields([{ name: "myImage", maxCount: 1 }]);

router.post("/login", userControllers.login);
router.post("/", userControllers.addUser);

router.use(authenticateJWT);

router.put("/password/change", userControllers.changePassword);
router.get("/:id", userControllers.getUserById);
router.get("/:username/exists", userControllers.userExist);
router.get("/:email/existemail", userControllers.emailExist);
router.get("/:id/posts", userControllers.getUserByIdWithPosts);
router.get("/", authorizeRoles(["Admin"]), userControllers.getAllUser);
router.put("/:id", multerConfig, userControllers.updateUser);
router.delete("/:id", userControllers.deleteUser);

export default router;
