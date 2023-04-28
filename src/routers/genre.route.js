const { Router } = require("express");
const genreRouter = Router();

const genreController = require("../controllers/genre.controller");

genreRouter.get("/", genreController.getGenre);

module.exports = genreRouter;
