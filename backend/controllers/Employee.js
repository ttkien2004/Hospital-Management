const mssql = require("mssql");

// Lấy danh sách nhân viên
const getAllEmployees = (req, res) => {
  const query = `
      SELECT 
          nv.ID, 
          nv.Ho, 
          nv.TEN, 
          nv.CCCD, 
          nv.NgaySinh, 
          nv.GioiTinh, 
          nv.Email, 
          nv.NgayBatDau, 
          nv.Sdt1, 
          nv.Sdt2,
          CASE 
              WHEN qtv.QtvID IS NOT NULL THEN 'QuanTriVien'
              WHEN ds.DuocSiID IS NOT NULL THEN 'DuocSi'
              WHEN bs.BsID IS NOT NULL THEN 'BacSi'
              WHEN yt.YtaID IS NOT NULL THEN 'YTa'
              ELSE 'KhongXacDinh'
          END AS LoaiNhanVien
      FROM 
          NhanVien nv
      LEFT JOIN 
          QuanTriVien qtv ON nv.ID = qtv.QtvID
      LEFT JOIN 
          DuocSi ds ON nv.ID = ds.DuocSiID
      LEFT JOIN 
          BacSi bs ON nv.ID = bs.BsID
      LEFT JOIN 
          YTa yt ON nv.ID = yt.YtaID;
    `;

  new mssql.Request().query(query, (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ msg: "Error fetching employees", error: err.message });
    } else {
      res.status(200).json({ data: result.recordset });
    }
  });
};

const createNewEmployee = async (req, res) => {
  const {
    id,
    ho,
    ten,
    cccd,
    ngaySinh,
    gioiTinh,
    email,
    ngayBatDau,
    sdt1,
    sdt2,
    role,
    chiNhanhId,
    tenKhoa,
  } = req.body;

  try {
    const pool = await mssql.connect();
    const request = new mssql.Request(pool);

    // Kiểm tra sự tồn tại của chiNhanhId nếu role là DuocSi
    if (role === "DuocSi" || role === "BacSi" || role === "YTa") {
      if (!chiNhanhId) {
        return res.status(400).json({ msg: "chiNhanhId is required" });
      }

      // Kiểm tra sự tồn tại của chiNhanhId
      const checkChiNhanhQuery = `SELECT COUNT(*) AS Count FROM ChiNhanh WHERE ID = @chiNhanhId`;
      request.input("chiNhanhId", mssql.Int, chiNhanhId);
      const chiNhanhResult = await request.query(checkChiNhanhQuery);

      if (chiNhanhResult.recordset[0].Count === 0) {
        return res.status(404).json({
          msg: `ChiNhanh with ID ${chiNhanhId} not found`,
        });
      }
    }

    // Kiểm tra sự tồn tại của tenKhoa nếu role liên quan đến Khoa (BacSi, YTa)
    if ((role === "BacSi" || role === "YTa") && !tenKhoa) {
      return res.status(400).json({ msg: "tenKhoa is required" });
    }

    if ((role === "BacSi" || role === "YTa") && tenKhoa) {
      const checkKhoaQuery = `SELECT COUNT(*) AS Count FROM Khoa WHERE TenKhoa = @tenKhoa`;
      request.input("tenKhoa", mssql.VarChar, tenKhoa);
      const khoaResult = await request.query(checkKhoaQuery);

      if (khoaResult.recordset[0].Count === 0) {
        return res
          .status(404)
          .json({ msg: `Khoa with TenKhoa ${tenKhoa} not found` });
      }
    }

    // Thêm nhân viên vào bảng NhanVien
    const queryNhanVien = `
      INSERT INTO NhanVien (ID, Ho, TEN, CCCD, NgaySinh, GioiTinh, Email, NgayBatDau, Sdt1, Sdt2)
      VALUES (@id, @ho, @ten, @cccd, @ngaySinh, @gioiTinh, @email, @ngayBatDau, @sdt1, @sdt2)
    `;
    request.input("id", mssql.Char, id);
    request.input("ho", mssql.VarChar, ho);
    request.input("ten", mssql.VarChar, ten);
    request.input("cccd", mssql.VarChar, cccd);
    request.input("ngaySinh", mssql.Date, ngaySinh);
    request.input("gioiTinh", mssql.Char, gioiTinh);
    request.input("email", mssql.VarChar, email || null);
    request.input("ngayBatDau", mssql.Date, ngayBatDau || null);
    request.input("sdt1", mssql.Char, sdt1);
    request.input("sdt2", mssql.Char, sdt2);

    await request.query(queryNhanVien);

    // Xử lý theo vai trò
    if (role === "QuanTriVien") {
      const queryQTV = `
        INSERT INTO QuanTriVien (QtvID) 
        VALUES (@id)
      `;
      await request.query(queryQTV);
    } else if (role === "DuocSi") {
      const queryDuocSi = `
        INSERT INTO DuocSi (DuocSiID, ChiNhanhID) 
        VALUES (@id, @chiNhanhId)
      `;
      await request.query(queryDuocSi);
    } else if (role === "BacSi") {
      const queryBacSi = `
          INSERT INTO BacSi (BsID, ChinhNhanhID, TenKhoa) 
          VALUES (@id, @chiNhanhId, @tenKhoa)
        `;
      await request.query(queryBacSi);
    } else if (role === "YTa") {
      const queryYTa = `
          INSERT INTO YTa (YtaID, ChinhNhanhID, TenKhoa) 
          VALUES (@id, @chiNhanhId, @tenKhoa)
        `;
      await request.query(queryYTa);
    } else {
      return res.status(400).json({ msg: "Invalid role provided" });
    }

    res.status(201).json({ msg: `${role} created successfully` });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error creating employee", error: error.message });
  }
};

// Lấy thông tin nhân viên theo ID
const getEmployee = (req, res) => {
  const { id } = req.params;
  const request = new mssql.Request();
  request.input("id", mssql.Char, id);

  request.query("SELECT * FROM NhanVien WHERE ID = @id", (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ msg: "Error fetching employee", error: err.message });
    } else if (result.recordset.length === 0) {
      res.status(404).json({ msg: "No Employee found with the given ID" });
    } else {
      res.status(200).json({ data: result.recordset[0] });
    }
  });
};
const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { ho, ten, cccd, ngaySinh, gioiTinh, email, ngayBatDau, sdt1, sdt2 } =
    req.body;

  try {
    const pool = await mssql.connect();
    const request = new mssql.Request(pool);

    const fieldsToUpdate = [];
    if (ho) {
      fieldsToUpdate.push("Ho = @ho");
      request.input("ho", mssql.VarChar, ho);
    }
    if (ten) {
      fieldsToUpdate.push("TEN = @ten");
      request.input("ten", mssql.VarChar, ten);
    }
    if (cccd) {
      fieldsToUpdate.push("CCCD = @cccd");
      request.input("cccd", mssql.VarChar, cccd);
    }
    if (ngaySinh) {
      fieldsToUpdate.push("NgaySinh = @ngaySinh");
      request.input("ngaySinh", mssql.Date, ngaySinh);
    }
    if (gioiTinh) {
      fieldsToUpdate.push("GioiTinh = @gioiTinh");
      request.input("gioiTinh", mssql.Char, gioiTinh);
    }
    if (email) {
      fieldsToUpdate.push("Email = @email");
      request.input("email", mssql.VarChar, email);
    }
    if (ngayBatDau) {
      fieldsToUpdate.push("NgayBatDau = @ngayBatDau");
      request.input("ngayBatDau", mssql.Date, ngayBatDau);
    }
    if (sdt1) {
      fieldsToUpdate.push("Sdt1 = @sdt1");
      request.input("sdt1", mssql.Char, sdt1);
    }
    if (sdt2) {
      fieldsToUpdate.push("Sdt2 = @sdt2");
      request.input("sdt2", mssql.Char, sdt2);
    }

    // Nếu không có trường nào để cập nhật, trả về lỗi
    if (fieldsToUpdate.length === 0) {
      return res.status(400).json({ msg: "No fields to update" });
    }

    const query = `
        UPDATE NhanVien
        SET ${fieldsToUpdate.join(", ")}
        WHERE ID = @id
      `;
    request.input("id", mssql.Char, id.trim());

    const result = await request.query(query);

    if (result.rowsAffected[0] === 0) {
      res.status(404).json({ msg: "Employee not found" });
    } else {
      res.status(200).json({ msg: "Employee updated successfully" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error updating employee", error: error.message });
  }
};

// Xóa nhân viên
const deleteEmployee = (req, res) => {
  const { id } = req.params;
  const request = new mssql.Request();
  request.input("id", mssql.Char, id);

  request.query("DELETE FROM NhanVien WHERE ID = @id", (err, result) => {
    if (err) {
      res
        .status(400)
        .json({ msg: "Error deleting employee", error: err.message });
    } else if (result.rowsAffected[0] === 0) {
      res.status(404).json({ msg: "No Employee found with the given ID" });
    } else {
      res.status(200).json({ msg: "Employee deleted successfully" });
    }
  });
};

module.exports = {
  getAllEmployees,
  getEmployee,
  createNewEmployee,
  deleteEmployee,
  updateEmployee,
};
