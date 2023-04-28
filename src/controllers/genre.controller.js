const genreModel = require("../models/genre.models");

const getGenre = async (req, res) => {
  try {
    const result = await genreModel.getGenre();
    if (result.rows.length === 0) {
      res.status(404).json({
        data: [],
        msg: "Data Not Found",
      });
      return;
    }
    res.status(200).json({
      data: result.rows,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getGenre,
};
