const db = require("../config/supabase");

const createSchedule = async (body) => {
  return new Promise((resolve, reject) => {
    let sqlQuery =
      "INSERT INTO teather_studio (teather_id, open_date, open_time, price, movie_id) VALUES ";
    let values = [];
    body.forEach((element, idx) => {
      if (values.length) sqlQuery += ", ";
      const { teather_id, open_date, open_time, price, movie_id } = element;
      sqlQuery += `($${1 + 5 * idx}, $${2 + 5 * idx}, $${3 + 5 * idx}, $${
        4 + 5 * idx
      }, $${5 + 5 * idx})`;
      values.push(teather_id, open_date, open_time, price, movie_id);
    });
    db.query(sqlQuery, values, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// const createSchedule = async (body) => {
//   return new Promise((resolve, reject) => {
//     const { teather_id, open_date, open_time, price, movie_id } = body;
//     const sqlQuery =
//       "INSERT INTO teather_studio (teather_id, open_date, open_time, price, movie_id) VALUES ($1, $2, $3, $4, $5) RETURNING *";
//     const values = [teather_id, open_date, open_time, price, movie_id];
//     db.query(sqlQuery, values, (err, result) => {
//       if (err) return reject(err);
//       resolve(result);
//     });
//   });
// };

const getDataStudio = () => {
  return new Promise((resolve, reject) => {
    db.query(
      "select ts.id, ts.teather_id, open_time, open_date, t.teather_name, t.address, t.image, ts.price from teather_studio ts join teathers t on ts.teather_id=t.id",
      (error, result) => {
        if (error) reject(error);
        else resolve(result.rows);
      }
    );
  });
};
const getByMovie = (movie_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "select ts.teather_id, open_time, open_date, t.teather_name, t.address, t.image, ts.price from teather_studio ts join teathers t on ts.teather_id=t.id where ts.movie_id=$1",
      [movie_id],
      (error, result) => {
        if (error) reject(error);
        else resolve(result.rows);
      }
    );
  });
};

module.exports = {
  createSchedule,
  getDataStudio,
  getByMovie,
};
