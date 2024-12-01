// Có thể tham khảo file Patient.js trong controllers folder
const mssql = require("mssql");
const prisma = require("@prisma/client");

const getAllEquipments = (req, res) => {
  new mssql.Request().query("SELECT * FROM ThietBi", (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.status(200).json({ data: result.recordset });
    }
  });
};

const getEquipment = (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  new mssql.Request().query(
    `SELECT * FROM ThietBi WHERE ${id} = ID`,
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
  getAllEquipments,
  getEquipment,
};
