// Có thể tham khảo file Patient.js trong controllers folder
const mssql = require("mssql");
const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllEquipments = (req, res) => {
  const query = `
    SELECT tb.ID, tb.Ten, tb.TinhTrang, tb.Phong, ls.ThoiGianMuon, ls.ThoiGianTra, nv.Ho + ' ' + nv.TEN as NguoiMuon
    FROM ThietBi as tb
    LEFT JOIN LichSuSuDung as ls
    ON tb.ID = ls.ThietBiID
    LEFT JOIN NhanVien as nv
    ON ls.NhanVienID = nv.ID
    ORDER BY tb.ID;
  `;
  new mssql.Request().query(query, (err, result) => {
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
  const query = `
    SELECT tb.ID, tb.Ten, tb.TinhTrang, tb.Phong, ls.ThoiGianMuon, ls.ThoiGianTra, nv.Ho + nv.TEN as NguoiMuon
    FROM ThietBi as tb
    JOIN LichSuSuDung as ls
    ON tb.ID = ls.ThietBiID AND tb.ID = @id
    JOIN NhanVien as nv
    ON ls.NhanVienID = nv.ID
  `;
  const request = new mssql.Request();
  request.input("id", mssql.Int, id);
  request.query(query, (err, result) => {
    if (err) {
      res.status(400).json({ msg: `Cannot get the equipment with id: ${id}` });
    } else {
      res.status(200).json({ data: result.recordset });
    }
  });
};

const deleteEquipment = (req, res) => {
  const { equipID } = req.query;
  console.log(equipID);
  const query = `DELETE FROM ThietBi WHERE ID = @equipID`;
  const request = new mssql.Request();
  request.input("equipID", mssql.Int, equipID);
  request.query(query, (err, result) => {
    if (err) {
      res
        .status(400)
        .json({ msg: `Cannot delete equipment with id ${equipID}` });
    } else {
      res.status(200).json({ data: "Delete successfully" });
    }
  });
};
const updateEquipment = (req, res) => {
  const { id } = req.params;
  const { ten, status, room } = req.body;
  console.log(id, ten, status, room);
  const query = `
    UPDATE ThietBi
    SET Ten = @ten, TinhTrang = @status, Phong = @room
    WHERE ID = @id
  `;
  const request = new mssql.Request();
  request.input("id", mssql.Int, id);
  request.input("ten", mssql.VarChar, ten);
  request.input("status", mssql.VarChar, status);
  request.input("room", mssql.VarChar, room);

  request.query(query, (err, result) => {
    if (err) {
      res
        .status(400)
        .json({ msg: `Cannot update the equipment with id ${id}` });
    } else {
      res.status(200).json({ data: "Update successfully" });
    }
  });
};
const createEquipment = async (req, res) => {
  const { ten, status, room } = req.body;
  const request = new mssql.Request();
  const query = `
    INSERT INTO ThietBi (Ten, TinhTrang, Phong) 
    VALUES (@ten, @status, @room)
  `;
  request.input("ten", mssql.VarChar, ten);
  request.input("status", mssql.VarChar, status);
  request.input("room", mssql.VarChar, room);

  request.query(query, (err, result) => {
    if (err) {
      res.status(400).json({ msg: "Cannot create new equipment" });
    } else {
      res.status(201).json({ data: result.output });
    }
  });
};
module.exports = {
  getAllEquipments,
  getEquipment,
  deleteEquipment,
  updateEquipment,
  createEquipment,
};
