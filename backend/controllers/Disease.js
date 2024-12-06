const mssql = require("mssql");

const getAllDisease = (req, res) => {
  new mssql.Request().query("SELECT * FROM Benh", (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.status(200).json({ data: result.recordset });
    }
  });
};

module.exports = {
  getAllDisease,
};
