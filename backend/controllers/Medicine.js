const mssql = require("mssql");

// Lấy danh sách thuốc
const getAllMedicines = (req, res) => {
  new mssql.Request().query("SELECT * FROM Thuoc", (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ msg: "Error fetching medicines", error: err.message });
    } else {
      res.status(200).json({ data: result.recordset });
    }
  });
};

// Tạo mới thông tin thuốc
const createNewMedicine = (req, res) => {
  const {
    maSoThuoc,
    ten,
    giaNhap,
    giaBan,
    huongDanSuDung,
    hanSuDung,
    chongChiDinh,
    xuatXu,
    tong,
    tonKho,
  } = req.body;

  const query = `
    INSERT INTO Thuoc (MaSoThuoc, Ten, GiaNhap, GiaBan, HuongDanSuDung, HanSuDung, ChongChiDinh, XuatXu, Tong, TonKho)
    VALUES (@maSoThuoc, @ten, @giaNhap, @giaBan, @huongDanSuDung, @hanSuDung, @chongChiDinh, @xuatXu, @tong, @tonKho)
  `;
  const request = new mssql.Request();
  request.input("maSoThuoc", mssql.Char, maSoThuoc);
  request.input("ten", mssql.VarChar, ten);
  request.input("giaNhap", mssql.Decimal, giaNhap || null);
  request.input("giaBan", mssql.Decimal, giaBan || null);
  request.input("huongDanSuDung", mssql.VarChar, huongDanSuDung || null);
  request.input("hanSuDung", mssql.Date, hanSuDung);
  request.input("chongChiDinh", mssql.VarChar, chongChiDinh || null);
  request.input("xuatXu", mssql.VarChar, xuatXu || null);
  request.input("tong", mssql.Int, tong || null);
  request.input("tonKho", mssql.Int, tonKho || null);

  request.query(query, (err) => {
    if (err) {
      res
        .status(400)
        .json({ msg: "Error creating medicine", error: err.message });
    } else {
      res.status(201).json({ msg: "Medicine created successfully" });
    }
  });
};

// Lấy thông tin thuốc theo mã số
const getMedicine = (req, res) => {
  const { id } = req.params;
  const request = new mssql.Request();
  request.input("id", mssql.Char, id);

  request.query("SELECT * FROM Thuoc WHERE MaSoThuoc = @id", (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ msg: "Error fetching medicine", error: err.message });
    } else if (result.recordset.length === 0) {
      res.status(404).json({ msg: "No medicine found with the given ID" });
    } else {
      res.status(200).json({ data: result.recordset[0] });
    }
  });
};

const updateMedicine = async (req, res) => {
  const { id } = req.params;
  const {
    ten,
    giaNhap,
    giaBan,
    huongDanSuDung,
    hanSuDung,
    chongChiDinh,
    xuatXu,
    tong,
    tonKho,
  } = req.body;

  try {
    const pool = await mssql.connect();
    const request = new mssql.Request(pool);

    const fieldsToUpdate = [];
    if (ten) {
      fieldsToUpdate.push("Ten = @ten");
      request.input("ten", mssql.VarChar, ten);
    }
    if (giaNhap !== undefined) {
      fieldsToUpdate.push("GiaNhap = @giaNhap");
      request.input("giaNhap", mssql.Decimal(10, 2), giaNhap);
    }
    if (giaBan !== undefined) {
      fieldsToUpdate.push("GiaBan = @giaBan");
      request.input("giaBan", mssql.Decimal(10, 2), giaBan);
    }
    if (huongDanSuDung) {
      fieldsToUpdate.push("HuongDanSuDung = @huongDanSuDung");
      request.input("huongDanSuDung", mssql.VarChar, huongDanSuDung);
    }
    if (hanSuDung) {
      fieldsToUpdate.push("HanSuDung = @hanSuDung");
      request.input("hanSuDung", mssql.Date, hanSuDung);
    }
    if (chongChiDinh) {
      fieldsToUpdate.push("ChongChiDinh = @chongChiDinh");
      request.input("chongChiDinh", mssql.VarChar, chongChiDinh);
    }
    if (xuatXu) {
      fieldsToUpdate.push("XuatXu = @xuatXu");
      request.input("xuatXu", mssql.VarChar, xuatXu);
    }
    if (tong !== undefined) {
      fieldsToUpdate.push("Tong = @tong");
      request.input("tong", mssql.Int, tong);
    }
    if (tonKho !== undefined) {
      fieldsToUpdate.push("TonKho = @tonKho");
      request.input("tonKho", mssql.Int, tonKho);
    }

    if (fieldsToUpdate.length === 0) {
      return res.status(400).json({ msg: "No fields provided for update" });
    }

    const query = `
        UPDATE Thuoc
        SET ${fieldsToUpdate.join(", ")}
        WHERE MaSoThuoc = @id
      `;
    request.input("id", mssql.Char, id.trim());

    const result = await request.query(query);

    if (result.rowsAffected[0] === 0) {
      res.status(404).json({ msg: "No medicine found with the given ID" });
    } else {
      res.status(200).json({ msg: "Medicine updated successfully" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error updating medicine", error: error.message });
  }
};

// Xóa thông tin thuốc
const deleteMedicine = (req, res) => {
  const { id } = req.params;
  const request = new mssql.Request();
  request.input("id", mssql.Char, id);

  const query = `
      DELETE FROM Thuoc 
      WHERE MaSoThuoc = @id;
      SELECT @@ROWCOUNT AS DeletedCount;
    `;

  request.query(query, (err, result) => {
    if (err) {
      res
        .status(400)
        .json({ msg: "Error deleting medicine", error: err.message });
    } else {
      const deletedCount = result.recordset[0]?.DeletedCount || 0;
      if (deletedCount === 0) {
        res.status(404).json({ msg: "No medicine found with the given ID" });
      } else {
        res.status(200).json({ msg: "Medicine deleted successfully" });
      }
    }
  });
};

module.exports = {
  getAllMedicines,
  getMedicine,
  createNewMedicine,
  deleteMedicine,
  updateMedicine,
};
