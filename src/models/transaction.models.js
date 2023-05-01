const db = require("../config/supabase");

const getHistory = (teathStudioId) => {
  console.log(teathStudioId);
  return new Promise((resolve, reject) => {
    const sqlQuery =
      "SELECT block_name, block_number FROM history h JOIN transaction t ON t.history_id = h.id WHERE teathStudio_id = $1";
    db.query(sqlQuery, [teathStudioId], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  getHistory,
};
