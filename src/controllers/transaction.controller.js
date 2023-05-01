const transactionModels = require("../models/transaction.models");

const getHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await transactionModels.getHistory(id);
    res.status(200).json({
      data: result.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

module.exports = {
  getHistory,
};
