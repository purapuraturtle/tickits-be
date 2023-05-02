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
        msg: "Success booking movie",
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
  readDataBooking: async (req, res) => {
    try {
      const { movie_id, teathstudio_id } = req.body;
      const data = await bookingModel.getDataBooked(movie_id, teathstudio_id);
      const result = data.reduce((acc, cur) => {
        const existingObj = acc.find((obj) => obj.id === cur.id);

        if (existingObj) {
          existingObj.seat.push({
            block_name: cur.block_name,
            block_number: cur.block_number,
          });
        } else {
          acc.push({
            id: cur.id,
            teather_name: cur.teather_name,
            image: cur.image || null,
            movie_name: cur.movie_name,
            open_date: cur.open_date,
            open_time: cur.open_time,
            price: cur.price,
            seat: [
              { block_name: cur.block_name, block_number: cur.block_number },
            ],
          });
        }

        return acc;
      }, []);
      return res.status(200).json({
        status: 200,
        msg: "Success get data booked",
        data: result,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: 500, msg: "internal server error" });
    }
  },
  readDataByUserId: async (req, res) => {
    try {
      const { id } = req.authInfo;
      const data = await bookingModel.getDataBookingByUser(id);
      const result = data.reduce((acc, cur) => {
        const existingObj = acc.find((obj) => obj.id === cur.id);

        if (existingObj) {
          existingObj.seat.push({
            block_name: cur.block_name,
            block_number: cur.block_number,
          });
        } else {
          acc.push({
            id: cur.id,
            teather_name: cur.teather_name,
            image: cur.image || null,
            movie_name: cur.movie_name,
            total_price: cur.total_price,
            payment_method: cur.payment_method,
            seat: [
              { block_name: cur.block_name, block_number: cur.block_number },
            ],
            created_at: cur.created_at,
          });
        }

        return acc;
      }, []);

      return res.status(200).json({
        status: 200,
        msg: "Success get data booking",
        data: result,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: 500, msg: "internal server error" });
    }
  },
};
