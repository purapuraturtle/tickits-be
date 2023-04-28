//
const express = require("express");
const masterRouter = express.Router();

const welcomeRouter = require("./welcome.route");

masterRouter.use("/", welcomeRouter);

module.exports = masterRouter;
