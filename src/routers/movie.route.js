const { Router } = require("express");
const movieRouter = Router();

const movieController = require("../controllers/movie.controller");

const authMiddleware = require("../middlewares/auth");

const memoryUpload = require("../middlewares/memoryUpload");

movieRouter.post(
  "/",
  authMiddleware.checkToken,
  memoryUpload.single("image"),
  movieController.createMovie
);
movieRouter.get("/", movieController.readDataMovies);
movieRouter.get("/:id", movieController.readDataMovie);

module.exports = movieRouter;
