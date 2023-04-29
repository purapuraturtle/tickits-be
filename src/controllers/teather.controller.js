const teatherModels = require("../models/teather.models");

const createSchedule = async (req, res) => {
  try {
    const { body } = req;
    const result = await teatherModels.createSchedule(body);
    res.status(201).json({
      msg: "Create Schedule Success",
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
  createSchedule,
};
