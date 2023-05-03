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

const createGenreMovie = (data) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = "INSERT INTO movie_genre (movie_id, genre_id) VALUES ";
    let values = [];

    data.forEach((element, idx) => {
      if (idx !== 0) sqlQuery += ", ";
      sqlQuery += `($${1 + 2 * idx}, $${2 + 2 * idx})`;
      values.push(element.movieId, element.genreId);
    });

    db.query(sqlQuery, values, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const getAllMovies = () => {
  return new Promise((resolve, reject) => {
    db.query(
      "select m.id, m.movie_name,  m.image, g.genre_name, m.category from movies m join movie_genre q on m.id=q.movie_id join genre g on q.genre_id=g.id",
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      }
    );
  });
};

const getDataById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "select m.id, m.movie_name, m.image, g.genre_name, release_date, director, duration_hour, duration_minute, aktors, sinopsis from movies m join movie_genre q on m.id=q.movie_id join genre g on q.genre_id=g.id where m.id=$1",
      [id],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      }
    );
  });
};

module.exports = {
  createMovie,
  createGenreMovie,
  getAllMovies,
  getDataById,
};
