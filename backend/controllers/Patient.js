// Lấy danh sách bệnh nhân
const mssql = require("mssql");

const getAllPatients = (req, res) => {
  const query = `
    SELECT * 
    FROM BenhNhan    
  `;
  new mssql.Request().query(query, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.status(200).json({ data: result.recordset });
    }
  });
};

const getPatient = (req, res) => {
  const { id } = req.params;
  console.log(id);
  new mssql.Request().query(
    `SELECT * FROM BenhNhan WHERE ${id} = ID`,
    (err, result) => {
      if (err) {
        console.error(err);
      } else {
        res.status(200).json({ data: result.recordset });
      }
    }
  );
};

const createNewPatient = (req, res) => {
  const { id, cccd, ho, ten, bdate, sex, bhyt, height, weight } = req.body;
  // console.log({ id, cccd, ho, ten, bdate, sex, bhyt, height, weight });
  const query = `
    INSERT INTO BenhNhan (ID, CCCD, Ho, Ten, NgaySinh, GioiTinh, BHYT, ChieuCao, CanNang)
    VALUES (@id, @cccd, @ho, @ten, @bdate, @sex, @bhyt, @height, @weight)
  `;
  const request = new mssql.Request();
  request.input("id", mssql.Char, id);
  request.input("cccd", mssql.Char, cccd || null);
  request.input("ho", mssql.VarChar, ho || null);
  request.input("ten", mssql.VarChar, ten || null);
  request.input("bdate", mssql.Date, bdate || null);
  request.input("sex", mssql.Char, sex || null);
  request.input("bhyt", mssql.Char, bhyt || null);
  request.input("height", mssql.Float, height || null);
  request.input("weight", mssql.Float, weight || null);

  request.query(query, (err, result) => {
    if (err) {
      res.status(400).json({ msg: err.message });
    } else {
      res.status(201).json({ data: result.output, msg: "Create successfully" });
    }
  });
};

const deletePatient = (req, res) => {
  const { id } = req.query;
  console.log(id);
  const query = `
          DELETE FROM BenhNhan WHERE ID = @id
      `;
  const request = new mssql.Request();
  request.input("id", mssql.Char, id);
  request.query(query, (err, result) => {
    if (err) {
      res.status(400).json({ msg: err.message });
    } else {
      res.status(201).json({ msg: "Delete successfully" });
    }
  });
};

const getLKB = (req, res) => {
  const { BnID } = req.params;
  console.log(BnID);
  const query = `
    SELECT *
    FROM LanKhamBenh
    WHERE @BnID = LanKhamBenh.BnID
  `;
  const request = new mssql.Request();
  request.input("BnID", mssql.Char, BnID);

  request.query(query, (err, result) => {
    if (err) {
      res.status(400).json({ msg: "Cannot fetch data from LanKhamBenh" });
    } else {
      res.status(200).json({ data: result.recordset });
    }
  });
};

const updatePatient = (req, res) => {
  const { id, cccd, ho, ten, bdate, sex, bhyt, height, weight } = req.body;
  const query = `
    UPDATE BenhNhan
    SET CCCD = @cccd, Ho = @ho, Ten = @ten, NgaySinh = @Bdate, GioiTinh = @sex, ChieuCao = @height, CanNang = @weight
    WHERE BenhNhan.ID = @id
  `;
  const request = new mssql.Request();
  request.input("id", mssql.Char, id);
  request.input("cccd", mssql.Char, cccd || null);
  request.input("ho", mssql.VarChar, ho || null);
  request.input("ten", mssql.VarChar, ten || null);
  request.input("bdate", mssql.Date, bdate || null);
  request.input("sex", mssql.Char, sex || null);
  request.input("bhyt", mssql.Char, bhyt || null);
  request.input("height", mssql.Float, height || null);
  request.input("weight", mssql.Float, weight || null);

  request.query(query, (err, result) => {
    if (err) {
      res.status(400).json({ msg: "Cannot update data from Benh Nhan" });
    } else {
      res.status(200).json({ data: "Update successfully" });
    }
  });
};
module.exports = {
  getAllPatients,
  getPatient,
  createNewPatient,
  deletePatient,
  getLKB,
  updatePatient,
};
