const mssql = require("mssql");

const getAllAllergy = (req, res) => {
  new mssql.Request().query("SELECT * FROM DiUng", (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.status(200).json({ data: result.recordset });
    }
  });
};

module.exports = {
  getAllAllergy,
};
