const { Router } = require("express");
const authRouter = Router();

const authController = require("../controllers/auth.controller");
const authentication = require("../middlewares/auth");
const upload = require("../middlewares/memoryUpload");

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/forgot-password", authController.forgotPassword);
authRouter.get("/reset-password/:id", authController.checkResetPassword);
authRouter.post("/reset-password/:id", authController.resetPassword);
authRouter.get(
  "/detail",
  authentication.checkToken,
  authController.getDataProfile
);
authRouter.patch(
  "/edit",
  authentication.checkToken,
  upload.single("image"),
  authController.editDataUsers
);
module.exports = authRouter;
