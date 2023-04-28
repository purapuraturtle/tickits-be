const db = require("../config/supabase");

const getGenre = () => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "SELECT * FROM genre";
    db.query(sqlQuery, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
};

module.exports = {
  getGenre,
};
