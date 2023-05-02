const express = require("express");
const route = express.Router();

const bookingController = require("../controllers/booking.controller");
const authentication = require("../middlewares/auth");

route.post("/", bookingController.createBooking);
route.get("/", bookingController.readDataBooking);
route.get(
  "/users",
  authentication.checkToken,
  bookingController.readDataByUserId
);

module.exports = route;
