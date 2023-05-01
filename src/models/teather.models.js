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

module.exports = {
  createSchedule,
};