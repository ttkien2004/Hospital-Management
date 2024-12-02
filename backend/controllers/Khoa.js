const mssql = require("mssql");

const getAllKhoa = (req, res) => {
  new mssql.Request().query("SELECT * FROM Khoa", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: "Cannot fetch data from Khoa" });
    } else {
      res
        .status(200)
        .json({ msg: "Get data successfully", data: result.recordset });
    }
  });
};

module.exports = {
  getAllKhoa,
};
