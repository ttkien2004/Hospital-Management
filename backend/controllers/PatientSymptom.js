const mssql = require("mssql");

const getAllPatientSymptom = (req, res) => {
  new mssql.Request().query(
    "SELECT * FROM TrieuChungCuaBenhNhan",
    (err, result) => {
      if (err) {
        console.error(err);
      } else {
        res.status(200).json({ data: result.recordset });
      }
    }
  );
};

module.exports = {
  getAllPatientSymptom,
};
