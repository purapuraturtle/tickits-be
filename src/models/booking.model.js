const db = require("../config/supabase");

module.exports = {
  addOrder: ({
    user_id,
    movie_id,
    teathStudio_id,
    total_price,
    payment_id,
  }) => {
    return new Promise((resolve, reject) => {
      db.query(
        "insert into history(user_id, movie_id, teathstudio_id, total_price, payment_id, created_at) values ($1, $2, $3, $4, $5, now()) returning id",
        [user_id, movie_id, teathStudio_id, total_price, payment_id],
        (error, result) => {
          if (error) reject(error);
          else resolve(result.rows);
        }
      );
    });
  },
  addTransaction: (id, seat) => {
    let query =
      "insert into transaction(history_id, block_name, block_number) values ";
    let values = [];
    seat.forEach((element, i) => {
      const { block_name, block_number } = element;
      if (values.length) {
        query += ", ";
      }
      query += `($${1 + 3 * i}, $${2 + 3 * i}, $${3 + 3 * i})`;
      values.push(id, block_name, block_number);
    });
    return new Promise((resolve, reject) => {
      db.query(query, values, (error) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          resolve();
        }
      });
    });
  },
  getTransactionById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "select h.id, t.teather_name, t.image, m.movie_name, ts.open_date, ts.open_time, ts.price, tr.block_name, tr.block_number from history h join movies m on h.movie_id=m.id join teather_studio ts on h.teathstudio_id=ts.id join teathers t on ts.teather_id=t.id join transaction tr on h.id=tr.history_id where h.id=$1",
        [id],
        (error, result) => {
          if (error) reject(error);
          else resolve(result.rows);
        }
      );
    });
  },
  getDataBooked: (movie_id, teathstudio_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "select h.id, t.teather_name, t.image, m.movie_name, ts.open_date, ts.open_time, ts.price, tr.block_name, tr.block_number from history h join movies m on h.movie_id=m.id join teather_studio ts on h.teathstudio_id=ts.id join teathers t on ts.teather_id=t.id join transaction tr on h.id=tr.history_id where h.movie_id=$1 and h.teathstudio_id=$2",
        [movie_id, teathstudio_id],
        (error, result) => {
          if (error) reject(error);
          else resolve(result.rows);
        }
      );
    });
  },
  getDataBookingByUser: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "select h.id, m.movie_name, m.image, t.teather_name, h.total_price, p.payment_method, h.created_at, tr.block_name, tr.block_number from history h join movies m on h.movie_id=m.id join payment p on h.payment_id=p.id join teather_studio ts on h.teathstudio_id=ts.id join teathers t on ts.teather_id=t.id join transaction tr on h.id=tr.history_id where h.user_id=$1",
        [id],
        (error, result) => {
          if (error) reject(error);
          else resolve(result.rows);
        }
      );
    });
  },
};
