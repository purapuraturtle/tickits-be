const db = require("../config/supabase");

const checkEmail = (email) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "SELECT email FROM users WHERE email = $1";
    db.query(sqlQuery, [email], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const register = (email, hashedPassword) => {
  return new Promise((resolve, reject) => {
    const sqlQuery =
      "INSERT INTO users (email, password) values ($1, $2) RETURNING email";
    db.query(sqlQuery, [email, hashedPassword], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const login = (email) => {
  return new Promise((resolve, reject) => {
    const sqlQuery =
      "SELECT id, role_id, email, password, phone, first_name, last_name, image FROM users WHERE email = $1";
    db.query(sqlQuery, [email], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  checkEmail,
  register,
  login,
};
