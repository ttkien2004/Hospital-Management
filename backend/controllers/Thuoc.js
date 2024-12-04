const mssql = require("mssql");

const getAllDependence = (req, res) => {
  new mssql.Request().query("SELECT * FROM Thuoc", (err, result) => {
    if (err) {
      res.status(500).json({ msg: "Cannnot fetch data from Thuoc" });
    } else {
      res.status(200).json({ data: result.recordsets });
    }
  });
};

module.exports = {
  getAllDependence,
};
