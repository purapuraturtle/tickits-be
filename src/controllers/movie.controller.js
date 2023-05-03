const moviesModel = require("../models/movie.models");
const genreModel = require("../models/genre.models");

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
    const genre = await genreModel.getGenre();
    const categories = req.body.category.split(",").map((item) => item.trim());
    const filteredGenre = genre.rows
      .filter((item) => categories.includes(item.genre_name))
      .map((item) => {
        return {
          movieId: result.rows[0].id,
          genreId: item.id,
        };
      });
    await moviesModel.createGenreMovie(filteredGenre);
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

    let { page, limit, search, sort } = req.query;
    page = page || 1;
    search = search || "";
    limit = limit < 5 ? 5 : limit || 5;
    sorting = sort || "";
    const data = await moviesModel.getAllMovies();
    const groupedData = data.reduce((acc, cur) => {
      const existingObj = acc.find((obj) => obj.id === cur.id);

      if (existingObj) {
        return acc;
      } else {
        acc.push({
          id: cur.id,
          movie_name: cur.movie_name,
          image: cur.image,
          genre_name: cur.genre_name,
          payment_method: cur.payment_method,
          category: cur.category,
        });
      }

      return acc;
    }, []);

    let dataFiltering = [];
    dataFiltering = groupedData.filter(
      (item) =>
        item.movie_name.toLowerCase().includes(search) ||
        item.category.toLowerCase().includes(search)
    );
    const totaldata = dataFiltering.length;
    const totalpage = Math.ceil(totaldata / limit);
    const sortingData =
      sorting == "asc"
        ? dataFiltering.sort((a, b) => {
            if (a.movie_name < b.movie_name) {
              return -1;
            }
            if (a.movie_name > b.movie_name) {
              return 1;
            }
            return 0;
          })
        : sorting == "dsc"
        ? dataFiltering.sort((a, b) => {
            if (a.movie_name < b.movie_name) {
              return 1;
            }
            if (a.movie_name > b.movie_name) {
              return -1;
            }
            return 0;
          })
        : dataFiltering;
    let result = helper.listToMatrix(sortingData, limit);

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
    console.log(error);
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
