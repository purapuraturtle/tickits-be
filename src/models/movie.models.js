const db = require("../config/supabase");

const createMovie = (req, fileLink) => {
  return new Promise((resolve, reject) => {
    const {
      movie_name,
      category,
      release_date,
      duration_hour,
      duration_minute,
      director,
      aktors,
      sinopsis,
    } = req.body;
    const sqlQuery =
      "INSERT INTO movies (movie_name, category, release_date, duration_hour, duration_minute, director, aktors, sinopsis, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *";
    const values = [
      movie_name,
      category,
      release_date,
      duration_hour,
      duration_minute,
      director,
      aktors,
      sinopsis,
      fileLink,
    ];
    db.query(sqlQuery, values, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  createMovie,
};
