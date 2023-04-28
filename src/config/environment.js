module.exports = {
  host: process.env.DB_HOST,
  db: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  user: process.env.DB_USER,
  pwd: process.env.DB_PWD,
  serverPort: process.env.SERVER_PORT,
  jwtSecret: process.env.JWT_SECRET,
};
