// Lấy danh sách bệnh nhân
const mssql = require("mssql");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllPatients = async (req, res) => {
  // const query = `
  //   SELECT *
  //   FROM BenhNhan
  // `;
  // new mssql.Request().query(query, (err, result) => {
  //   if (err) {
  //     console.error(err);
  //   } else {
  //     res.status(200).json({ data: result.recordset });
  //   }
  // });
  try {
    const patients = await prisma.benhNhan.findMany();

    res.status(200).json({ data: patients });
  } catch (err) {
    res.status(500).json({ err: "Can not fetch data from database" });
  }
};

const getPatient = async (req, res) => {
  const { id } = req.params;
  if (id === undefined || id.length < 9) {
    return res.status(400).json({ error: "ID không hợp lệ" });
  } else if (!id.startsWith("BN")) {
    return res.status(400).json({ error: "ID bặt buộc bắt đầu với chuỗi BN" });
  }
  // new mssql.Request().query(
  //   `SELECT * FROM BenhNhan WHERE ${id} = ID`,
  //   (err, result) => {
  //     if (err) {
  //       console.error(err);
  //     } else {
  //       res.status(200).json({ data: result.recordset });
  //     }
  //   }
  // );
  try {
    const patient = await prisma.benhNhan.findUnique({
      where: {
        ID: id,
      },
    });

    if (!patient) {
      return res.status(404).json({ error: "Patient does not exist" });
    }
    return res.status(200).json({ data: patient });
  } catch (err) {
    return res.status(500).json({ err: "Internal server error" });
  }
};

const createNewPatient = async (req, res) => {
  const { id, cccd, ho, ten, bdate, sex, bhyt, height, weight } = req.body;
  if (id === undefined || id.length < 9) {
    return res.status(400).json({ error: "ID không hợp lệ" });
  } else if (!id.startsWith("BN")) {
    return res.status(400).json({ error: "ID bặt buộc bắt đầu với chuỗi BN" });
  }
  // console.log({ id, cccd, ho, ten, bdate, sex, bhyt, height, weight });
  // const query = `
  //   INSERT INTO BenhNhan (ID, CCCD, Ho, Ten, NgaySinh, GioiTinh, BHYT, ChieuCao, CanNang)
  //   VALUES (@id, @cccd, @ho, @ten, @bdate, @sex, @bhyt, @height, @weight)
  // `;
  // const request = new mssql.Request();
  // request.input("id", mssql.Char, id);
  // request.input("cccd", mssql.Char, cccd || null);
  // request.input("ho", mssql.VarChar, ho || null);
  // request.input("ten", mssql.VarChar, ten || null);
  // request.input("bdate", mssql.Date, bdate || null);
  // request.input("sex", mssql.Char, sex || null);
  // request.input("bhyt", mssql.Char, bhyt || null);
  // request.input("height", mssql.Float, height || null);
  // request.input("weight", mssql.Float, weight || null);

  // request.query(query, (err, result) => {
  //   if (err) {
  //     res.status(400).json({ msg: err.message });
  //   } else {
  //     res.status(201).json({ data: result.output, msg: "Create successfully" });
  //   }
  // });

  try {
    console.log(id, cccd, ho, ten, bdate, sex, bhyt, height, weight);
    const patient = await prisma.benhNhan.create({
      data: {
        ID: id,
        CCCD: cccd,
        Ho: ho,
        Ten: ten,
        NgaySinh: bdate !== "" ? new Date(bdate) : null,
        GioiTinh: sex,
        BHYT: bhyt || null,
        ChieuCao: height ? parseFloat(height) : null,
        CanNang: weight ? parseFloat(weight) : null,
      },
    });

    return res.status(201).json({ data: patient });
  } catch (err) {
    if (err.code === "P2002") {
      return res.status(400).json({ error: "This record has already existed" });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deletePatient = async (req, res) => {
  const { id } = req.query;
  if (id === undefined || id.length < 9) {
    return res.status(400).json({ error: "ID không hợp lệ" });
  }
  // else if (!id.startsWith("BN")) {
  //   return res.status(400).json({ error: "ID bặt buộc bắt đầu với chuỗi BN" });
  // }
  // console.log(id);
  // const query = `
  //         DELETE FROM BenhNhan WHERE ID = @id
  //     `;
  // const request = new mssql.Request();
  // request.input("id", mssql.Char, id);
  // request.query(query, (err, result) => {
  //   if (err) {
  //     res.status(400).json({ msg: err.message });
  //   } else {
  //     res.status(201).json({ data: "Delete successfully" });
  //   }
  // });
  try {
    const patient = await prisma.benhNhan.findUnique({
      where: {
        ID: id,
      },
    });

    if (!patient) {
      return res.status(404).json({ error: "This record does not exist" });
    }

    const deletePatient = await prisma.benhNhan.delete({
      where: {
        ID: id,
      },
    });
    return res
      .status(200)
      .json({ data: deletePatient, message: "Delete successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getLKB = async (req, res) => {
  const { BnID } = req.params;
  if (BnID === undefined || BnID.length < 9) {
    return res.status(400).json({ error: "ID không hợp lệ" });
  } else if (!BnID.startsWith("BN")) {
    return res.status(400).json({ error: "ID bặt buộc bắt đầu với chuỗi BN" });
  }
  // const query = `
  //   SELECT *
  //   FROM LanKhamBenh
  //   WHERE @BnID = LanKhamBenh.BnID
  // `;
  // const request = new mssql.Request();
  // request.input("BnID", mssql.Char, BnID);

  // request.query(query, (err, result) => {
  //   if (err) {
  //     res.status(400).json({ msg: "Cannot fetch data from LanKhamBenh" });
  //   } else {
  //     res.status(200).json({ data: result.recordset });
  //   }
  // });
  try {
    const lkb = await prisma.lanKhamBenh.findMany({
      where: {
        BnID: BnID,
      },
    });

    if (!lkb) {
      return res.status(404).json({ error: "This id does not exist" });
    }
    return res.status(200).json({ data: lkb });
  } catch {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const updatePatient = async (req, res) => {
  const { id, cccd, ho, ten, bdate, sex, bhyt, height, weight } = req.body;
  if (id === undefined || id.length < 9) {
    return res.status(400).json({ error: "ID không hợp lệ" });
  } else if (!id.startsWith("BN")) {
    return res.status(400).json({ error: "ID bặt buộc bắt đầu với chuỗi BN" });
  }
  // const query = `
  //   UPDATE BenhNhan
  //   SET CCCD = @cccd, Ho = @ho, Ten = @ten, NgaySinh = @Bdate, GioiTinh = @sex, ChieuCao = @height, CanNang = @weight
  //   WHERE BenhNhan.ID = @id
  // `;
  // const request = new mssql.Request();
  // request.input("id", mssql.Char, id);
  // request.input("cccd", mssql.Char, cccd || null);
  // request.input("ho", mssql.VarChar, ho || null);
  // request.input("ten", mssql.VarChar, ten || null);
  // request.input("bdate", mssql.Date, bdate || null);
  // request.input("sex", mssql.Char, sex || null);
  // request.input("bhyt", mssql.Char, bhyt || null);
  // request.input("height", mssql.Float, height || null);
  // request.input("weight", mssql.Float, weight || null);

  // request.query(query, (err, result) => {
  //   if (err) {
  //     res.status(400).json({ msg: "Cannot update data from Benh Nhan" });
  //   } else {
  //     res.status(200).json({ data: "Update successfully" });
  //   }
  // });

  try {
    const patient = await prisma.benhNhan.findUnique({
      where: {
        ID: id,
      },
    });
    if (!patient) {
      return res.status(404).json({ error: "This record does not exist" });
    }
    const newPatient = await prisma.benhNhan.update({
      where: {
        ID: id,
      },
      data: {
        Ho: ho,
        Ten: ten,
        CCCD: cccd,
        NgaySinh: bdate !== "" ? new Date(bdate) : null,
        GioiTinh: sex,
        BHYT: bhyt || null,
        ChieuCao: height || null,
        CanNang: weight || null,
      },
    });
    return res
      .status(200)
      .json({ data: newPatient, message: "Update successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
  getAllPatients,
  getPatient,
  createNewPatient,
  deletePatient,
  getLKB,
  updatePatient,
};
