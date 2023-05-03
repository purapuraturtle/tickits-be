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

const readDataStudio = async (req, res) => {
  try {
    let { open_date } = req.query;
    const data = await teatherModels.getDataStudio();
    const result = data.reduce((acc, cur) => {
      const existingItem = acc.find(
        (item) => item.teather_id === cur.teather_id
      );

      if (existingItem) {
        if (!existingItem.open_time.includes(cur.open_time)) {
          existingItem.open_time.push({
            id: cur.id,
            open_time: cur.open_time,
            price: cur.price,
          });
        }
      } else {
        acc.push({
          teather_id: cur.teather_id,
          teather_name: cur.teather_name,
          address: cur.address,
          image: cur.image,
          open_date: cur.open_date,
          open_time: [
            { id: cur.id, open_time: cur.open_time, price: cur.price },
          ],
        });
      }

      return acc;
    }, []);

    console.log(open_date);
    const newResult = open_date
      ? result.filter((item) => {
          const itemDate = new Date(item.open_date).toISOString().split("T")[0];
          return itemDate.includes(open_date);
        })
      : result;
    return res
      .status(200)
      .json({ status: 200, msg: "success get data", data: newResult });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};
module.exports = {
  createSchedule,
  readDataStudio,
};
