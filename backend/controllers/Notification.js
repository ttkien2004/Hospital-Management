const mssql = require("mssql");

// Lấy danh sách thông báo
const getAllNotifications = (req, res) => {
  new mssql.Request().query("SELECT * FROM ThongBao", (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ msg: "Error fetching notifications", error: err.message });
    } else {
      res.status(200).json({ data: result.recordset });
    }
  });
};

// Tạo thông báo mới
const createNewNotification = async (req, res) => {
  const { id, qtvId, tieuDe, noiDung, thoiGian } = req.body;

  try {
    const pool = await mssql.connect(); // Kết nối tới cơ sở dữ liệu
    const request = new mssql.Request(pool);

    // Kiểm tra xem QtvID có tồn tại không
    const checkQuery = `SELECT COUNT(*) AS count FROM QuanTriVien WHERE QtvID = @qtvId`;
    request.input("qtvId", mssql.Char, qtvId);

    const checkResult = await request.query(checkQuery);

    if (checkResult.recordset[0].count === 0) {
      return res
        .status(404)
        .json({ msg: "No QuanTriVien found with the given qtvId" });
    }

    // Nếu QtvID tồn tại, thêm mới thông báo
    const insertQuery = `
      INSERT INTO ThongBao (ID, QtvID, TieuDe, NoiDung, ThoiGian)
      VALUES (@id, @qtvId, @tieuDe, @noiDung, @thoiGian)
    `;

    request.input("id", mssql.Char, id);
    request.input("tieuDe", mssql.VarChar, tieuDe);
    request.input("noiDung", mssql.VarChar, noiDung);
    request.input("thoiGian", mssql.DateTime, thoiGian || null);

    await request.query(insertQuery);

    res.status(201).json({ msg: "Notification created successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error creating notification", error: err.message });
  }
};

// Lấy thông báo theo ID
const getNotification = (req, res) => {
  const { id } = req.params;
  const request = new mssql.Request();
  request.input("id", mssql.Char, id);

  request.query("SELECT * FROM ThongBao WHERE ID = @id", (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ msg: "Error fetching notification", error: err.message });
    } else if (result.recordset.length === 0) {
      res.status(404).json({ msg: "No notification found with the given ID" });
    } else {
      res.status(200).json({ data: result.recordset[0] });
    }
  });
};

// Xóa thông báo
const deleteNotification = (req, res) => {
  const { id } = req.params;
  const request = new mssql.Request();
  request.input("id", mssql.Char, id);

  request.query("DELETE FROM ThongBao WHERE ID = @id", (err, result) => {
    if (err) {
      res
        .status(400)
        .json({ msg: "Error deleting notification", error: err.message });
    } else if (result.rowsAffected[0] === 0) {
      res.status(404).json({ msg: "No notification found with the given ID" });
    } else {
      res.status(200).json({ msg: "Notification deleted successfully" });
    }
  });
};

module.exports = {
  getAllNotifications,
  getNotification,
  createNewNotification,
  deleteNotification,
};
