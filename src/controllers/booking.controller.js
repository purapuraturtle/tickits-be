const bookingModel = require("../models/booking.model");
const db = require("../config/supabase");

module.exports = {
  createBooking: async (req, res) => {
    const client = await db.connect();
    try {
      const { teathStudio_id, movie_id, seat } = req.body;
      const getPrice = await bookingModel.getPrice(movie_id, teathStudio_id);

      const total_price = seat.length * getPrice[0].price;

      const data = { ...req.body, total_price };
      await client.query("BEGIN");
      const addOrder = await bookingModel.addOrder(data);
      console.log(addOrder);
      await bookingModel.addTransaction(addOrder[0].id, seat);
      await client.query("COMMIT");
      const result = await bookingModel.getTransactionById(addOrder[0].id);
      return res.status(200).json({
        status: 200,
        msg: "Success order product",
        data: result,
      });
    } catch (error) {
      await client.query("ROLLBACK");
      return res
        .status(500)
        .json({ status: 500, msg: "internal server error" });
    } finally {
      client.release();
    }
  },
};
