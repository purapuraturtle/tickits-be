//
const express = require("express");
const masterRouter = express.Router();

const welcomeRouter = require("./welcome.route");
const genreRouter = require("./genre.route");
const authRouter = require("./auth.route");

masterRouter.use("/", welcomeRouter);
masterRouter.use("/genre", genreRouter);

masterRouter.use("/auth", authRouter);

module.exports = masterRouter;
