const { Router } = require("express");

const teatherRouter = Router();

const authMiddleware = require("../middlewares/auth");

const teatherController = require("../controllers/teather.controller");

teatherRouter.post(
  "/create-schedule",
  authMiddleware.checkToken,
  teatherController.createSchedule
);

teatherRouter.get("/", teatherController.readDataStudio);
teatherRouter.get("/:movie_id", teatherController.readDataByMovie);

module.exports = teatherRouter;
