const moviesModel = require("../models/movie.models");

const helper = require("../helpers/pages");

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

const readDataMovies = async (req, res) => {
  try {
    if (Object.keys(req.query).length === 0) {
      const data = await moviesModel.getAllMovies();
      return res
        .status(200)
        .json({ status: 200, msg: "Success get all movies", data });
    }
    let { page, limit, movie_name, category } = req.query;
    page = page || 1;
    category = category || "";
    limit = limit < 5 ? 5 : limit || 5;
    movie_name = movie_name || "";

    const data = await moviesModel.getAllMovies();

    let dataFiltering = [];
    dataFiltering = data.filter(
      (item) =>
        item.movie_name.toLowerCase().includes(movie_name) &&
        item.category.toLowerCase().includes(category)
    );
    const totaldata = dataFiltering.length;
    const totalpage = Math.ceil(totaldata / limit);

    let result = helper.listToMatrix(dataFiltering, limit);

    return res.status(200).json({
      status: 200,
      msg: "Success get data",
      totalpage: totalpage,
      limit: limit,
      page: Number(page) == "" ? 1 : Number(page),
      totaldata: totaldata,
      data:
        page == ""
          ? result[0]
          : Number(page) > totalpage
          ? []
          : result[page - 1],
    });
  } catch (error) {
    return res.status(500).json({ status: 500, msg: "internal server error" });
  }
};

const readDataMovie = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const data = await moviesModel.getDataById(id);
    return res
      .status(200)
      .json({ status: 200, msg: "Success get all movies", data });
  } catch (error) {
    return res.status(500).json({ status: 500, msg: "internal server error" });
  }
};

module.exports = {
  createMovie,
  readDataMovies,
  readDataMovie,
};
