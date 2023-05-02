const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { sendToMail } = require("../helpers/mail");
const { uploader } = require("../utils/cloudinary");

const client = require("../config/redis");
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
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const checkEmail = await authModels.checkEmail(email);
    if (checkEmail.rows.length < 1) {
      return res
        .status(404)
        .json({ status: 404, msg: "email not found", data: [] });
    }
    const { id, first_name } = checkEmail.rows[0];
    console.log(id);
    client.SETEX(id, 3600, id);
    const data = {
      name: first_name == null ? "New Users" : first_name,
      to: email,
      subject: "Reset Password",
      template: "forgotpassword.html",
      actionUrl: `http:localhost:3000/reset-password/${id}`,
    };
    await sendToMail(data);
    return res.status(200).json({
      status: 200,
      msg: `Sent!, Please check your email`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword, confirmPassword } = req.body;
    const userId = await client.get(id);
    if (!userId) {
      return res.status(400).json({ status: 404, msg: "Something wrong" });
    }
    const checkUser = await authModels.checkUser(userId);
    if (checkUser.length < 1) {
      return res.status(404).json({ msg: "Users not Found" });
    }
    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ status: 400, msg: "Password does not match" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const result = await authModels.updatePassword(userId, hashedPassword);
    return res
      .status(200)
      .json({ status: 200, msg: "Succes reset password", data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, msg: "Internal server error" });
  }
};
const getDataProfile = async (req, res) => {
  try {
    console.log(req.authInfo);
    const { id } = req.authInfo;
    const result = await authModels.getDetailId(id);
    return res
      .status(200)
      .json({ status: 200, msg: "Succes get data", data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, msg: "Internal server error" });
  }
};

const editDataUsers = async (req, res) => {
  try {
    const { id } = req.authInfo;
    let { first_name, last_name, phone } = req.body;
    const upload = await uploader(
      req,
      "profile",
      req.file?.originalname.split(".")[0]
    );
    const data = {
      first_name: first_name || undefined,
      last_name: last_name || undefined,
      phone: phone || undefined,
      image: req.file ? upload.data.url : undefined,
    };
    const result = await authModels.updateData(data, id);
    return res
      .status(200)
      .json({ status: 200, msg: "Succes update data", data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, msg: "Internal server error" });
  }
};

const editPassword = async (req, res) => {
  try {
    const { id } = req.authInfo;
    const { newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(403).json({
        status: 403,
        msg: "New Password and Confirm Password doesn't match",
      });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const result = await authModels.editPassword(id, hashedPassword);
    return res
      .status(200)
      .json({ status: 200, msg: "Succes update data", data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, msg: "Internal server error" });
  }
};

module.exports = {
  editDataUsers,
  register,
  login,
  forgotPassword,
  resetPassword,
  getDataProfile,
  editPassword,
};
