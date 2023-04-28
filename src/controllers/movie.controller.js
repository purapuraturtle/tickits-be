const moviesModel = require("../models/movie.models");

const { uploader } = require("../utils/cloudinary");

const createMovie = async (req, res) => {
  try {
    let fileLink = "";
    if (req.file) {
      const fileName = req.body.movie_name.replace(/\s/g, "");
      const upCloud = await uploader(req, "movie", fileName);
      fileLink = upCloud.data.secure_url;
    }
    const result = await moviesModel.createMovie(req, fileLink);
    res.status(201).json({
      msg: "Create Movie Success",
      data: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
      data: error.detail,
    });
  }
};

module.exports = {
  createMovie,
};
