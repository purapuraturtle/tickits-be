const { Router } = require("express");

const transactionRouter = Router();
const authMiddleware = require("../middlewares/auth");

const transactionController = require("../controllers/transaction.controller");

transactionRouter.get(
  "/history/:id",
  authMiddleware.checkToken,
  transactionController.getHistory
);

module.exports = transactionRouter;
