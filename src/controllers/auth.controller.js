const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const env = require("../config/environment");

const authModels = require("../models/auth.models");

const register = async (req, res) => {
  try {
    const { body } = req;
    const emailFromDb = await authModels.checkEmail(body.email);
    if (emailFromDb.rows.length === 1) {
      return res.status(400).json({
        msg: "Email already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const result = await authModels.register(body.email, hashedPassword);
    res.status(201).json({
      data: result.rows,
      msg: "Create account success",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const login = async (req, res) => {
  try {
    const { body } = req;
    const result = await authModels.login(body.email);
    if (result.rows.length < 1)
      return res.status(401).json({
        msg: "Email / Password Invalid",
      });
    const {
      id,
      role_id,
      email,
      password,
      phone,
      first_name,
      last_name,
      image,
    } = result.rows[0];
    const isPassValid = await bcrypt.compare(body.password, password);
    if (!isPassValid)
      return res.status(401).json({
        msg: "Email / Password Invalid",
      });

    const payload = { id, role_id, email, phone, first_name, last_name, image };
    const jwtOptions = { expiresIn: "2 days" };
    jwt.sign(payload, env.jwtSecret, jwtOptions, async (err, token) => {
      if (err) throw err;
      res.status(200).json({
        msg: "Login Success",
        data: {
          token,
          id,
          role_id,
          email,
          phone,
          first_name,
          last_name,
          image,
        },
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

module.exports = {
  register,
  login,
};
