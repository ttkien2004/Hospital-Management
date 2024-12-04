const mssql = require("mssql");

const getAllDiseaseSymptom = (req, res) => {
  new mssql.Request().query(
    "SELECT * FROM TrieuChungCuaBenh",
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
  getAllDiseaseSymptom,
};
