const mssql = require("mssql");

const getAllAddresses = (req, res) => {
  new mssql.Request().query("SELECT * FROM ChiNhanh", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: "Error fetching data from Chi Nhanh" });
    } else {
      res.status(200).json({ data: result.recordsets });
    }
  });
};

module.exports = {
  getAllAddresses,
};
