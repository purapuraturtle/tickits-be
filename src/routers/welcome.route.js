const { Router } = require("express");
const welcomeRouter = Router();
const welcomeController = require("../controllers/welcome.controller");

welcomeRouter.get("/", welcomeController.welcomePage);

module.exports = welcomeRouter;
