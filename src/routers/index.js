//
const express = require("express");
const masterRouter = express.Router();

const welcomeRouter = require("./welcome.route");
const genreRouter = require("./genre.route");
const authRouter = require("./auth.route");
const movieRouter = require("./movie.route");
const teatherRouter = require("./teather.route");
const bookingRouter = require("./booking.route");
const transactionRouter = require("./transaction.route");

masterRouter.use("/", welcomeRouter);
masterRouter.use("/genre", genreRouter);

masterRouter.use("/auth", authRouter);

masterRouter.use("/movie", movieRouter);

masterRouter.use("/teather", teatherRouter);
masterRouter.use("/booking", bookingRouter);

masterRouter.use("/transaction", transactionRouter);

module.exports = masterRouter;
