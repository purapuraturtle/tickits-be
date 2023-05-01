const { Router } = require("express");
const authRouter = Router();

const authController = require("../controllers/auth.controller");

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/forgot-password", authController.forgotPassword);
authRouter.post("/reset-password/:id", authController.resetPassword);

module.exports = authRouter;
