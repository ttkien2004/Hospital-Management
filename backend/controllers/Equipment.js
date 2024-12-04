// Có thể tham khảo file Patient.js trong controllers folder
const mssql = require("mssql");
const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllEquipments = async (req, res) => {
  // const query = `
  //   SELECT tb.ID, tb.Ten, tb.TinhTrang, tb.Phong, ls.ThoiGianMuon, ls.ThoiGianTra, nv.Ho + ' ' + nv.TEN as NguoiMuon
  //   FROM ThietBi as tb
  //   LEFT JOIN LichSuSuDung as ls
  //   ON tb.ID = ls.ThietBiID
  //   LEFT JOIN NhanVien as nv
  //   ON ls.NhanVienID = nv.ID
  //   ORDER BY tb.ID;
  // `;
  // new mssql.Request().query(query, (err, result) => {
  //   if (err) {
  //     console.error(err);
  //   } else {
  //     res.status(200).json({ data: result.recordset });
  //   }
  // });
  try {
    const equipments = await prisma.thietBi.findMany({
      include: {
        DuocMuon: {
          include: {
            NhanVien: {
              select: {
                Ho: true,
                TEN: true,
              },
            },
            LichSuSuDung: {
              select: {
                ThoiGianMuon: true,
                ThoiGianTra: true,
              },
            },
          },
        },
      },
    });

    return res.status(200).json({ data: equipments });
  } catch {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getEquipment = async (req, res) => {
  const { id } = req.params;
  // console.log(req.params);
  // const query = `
  //   SELECT tb.ID, tb.Ten, tb.TinhTrang, tb.Phong, ls.ThoiGianMuon, ls.ThoiGianTra, nv.Ho + nv.TEN as NguoiMuon
  //   FROM ThietBi as tb
  //   JOIN LichSuSuDung as ls
  //   ON tb.ID = ls.ThietBiID AND tb.ID = @id
  //   JOIN NhanVien as nv
  //   ON ls.NhanVienID = nv.ID
  // `;
  // const request = new mssql.Request();
  // request.input("id", mssql.Int, id);
  // request.query(query, (err, result) => {
  //   if (err) {
  //     res.status(400).json({ msg: `Cannot get the equipment with id: ${id}` });
  //   } else {
  //     res.status(200).json({ data: result.recordset });
  //   }
  // });
  try {
    const equipment = await prisma.thietBi.findUnique({
      where: {
        ID: id,
      },
      include: {
        DuocMuon: {
          include: {
            NhanVien: {
              select: {
                Ho: true,
                TEN: true,
              },
            },
            LichSuSuDung: {
              select: {
                ThoiGianMuon: true,
                ThoiGianTra: true,
              },
            },
          },
        },
      },
    });
    if (!equipment) {
      return res.status(404).json({ error: "This record does not exist" });
    }
    return res.status(200).json({ data: equipment });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deleteEquipment = async (req, res) => {
  const { equipID } = req.query;
  console.log(equipID);
  // const query = `DELETE FROM ThietBi WHERE ID = @equipID`;
  // const request = new mssql.Request();
  // request.input("equipID", mssql.Int, equipID);
  // request.query(query, (err, result) => {
  //   if (err) {
  //     res
  //       .status(400)
  //       .json({ msg: `Cannot delete equipment with id ${equipID}` });
  //   } else {
  //     res.status(200).json({ data: "Delete successfully" });
  //   }
  // });
  try {
    const equip = await prisma.thietBi.findUnique({
      where: {
        ID: equipID,
      },
    });
    if (!equip) {
      return res.status(404).json({ error: "This record does not exist" });
    }
    const deleteEquip = await prisma.thietBi.delete({
      where: {
        ID: equipID,
      },
    });
    return res
      .status(200)
      .json({ data: deleteEquip, message: "Delete successfully" });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
};
const updateEquipment = async (req, res) => {
  const { id, ten, status, room } = req.body;
  // console.log(id, ten, status, room);
  // const query = `
  //   UPDATE ThietBi
  //   SET Ten = @ten, TinhTrang = @status, Phong = @room
  //   WHERE ID = @id
  // `;
  // const request = new mssql.Request();
  // request.input("id", mssql.Int, id);
  // request.input("ten", mssql.VarChar, ten);
  // request.input("status", mssql.VarChar, status);
  // request.input("room", mssql.VarChar, room);

  // request.query(query, (err, result) => {
  //   if (err) {
  //     res
  //       .status(400)
  //       .json({ msg: `Cannot update the equipment with id ${id}` });
  //   } else {
  //     res.status(200).json({ data: "Update successfully" });
  //   }
  // });
  try {
    const equip = await prisma.thietBi.findUnique({
      where: {
        ID: id,
      },
    });
    if (!equip) {
      return res.status(404).json({ error: "This record does not exist" });
    }
    const newEquip = await prisma.thietBi.update({
      where: {
        ID: id,
      },
      data: {
        Ten: ten,
        TinhTrang: status,
        Phong: room,
      },
    });

    return res
      .status(200)
      .json({ data: newEquip, message: "Update successfully" });
  } catch {
    return res.status(500).json({ error: "Internal server error" });
  }
};
const createEquipment = async (req, res) => {
  const { ten, status, room } = req.body;
  // const request = new mssql.Request();
  // const query = `
  //   INSERT INTO ThietBi (Ten, TinhTrang, Phong)
  //   VALUES (@ten, @status, @room)
  // `;
  // request.input("ten", mssql.VarChar, ten);
  // request.input("status", mssql.VarChar, status);
  // request.input("room", mssql.VarChar, room);

  // request.query(query, (err, result) => {
  //   if (err) {
  //     res.status(400).json({ msg: "Cannot create new equipment" });
  //   } else {
  //     res.status(201).json({ data: result.output });
  //   }
  // });
  try {
    const newEquip = await prisma.thietBi.create({
      data: {
        Ten: ten,
        TinhTrang: status,
        Phong: room,
      },
    });
    return res
      .status(201)
      .json({ data: newEquip, message: "Create successfully" });
  } catch {
    return res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
  getAllEquipments,
  getEquipment,
  deleteEquipment,
  updateEquipment,
  createEquipment,
};
