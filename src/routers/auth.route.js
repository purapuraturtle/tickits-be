const { Router } = require("express");
const authRouter = Router();

const authController = require("../controllers/auth.controller");

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);

module.exports = authRouter;
