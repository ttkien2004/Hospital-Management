const mssql = require("mssql");
const bcrypt = require("bcrypt");

// Lấy danh sách User
const getAllUsers = (req, res) => {
  new mssql.Request().query("SELECT * FROM [Users]", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ msg: "Error fetching users", error: err.message });
    } else {
      res.status(200).json({ data: result.recordset });
    }
  });
};

// Tạo User mới
const createUser = async (req, res) => {
  const { username, password, userId } = req.body;

  try {
    const pool = await mssql.connect();
    const request = new mssql.Request(pool);

    // Kiểm tra xem userId có tồn tại trong bảng NhanVien không
    const checkQuery = `SELECT COUNT(*) AS count FROM NhanVien WHERE ID = @userId`;
    request.input("userId", mssql.Char, userId);

    const checkResult = await request.query(checkQuery);

    if (checkResult.recordset[0].count === 0) {
      return res
        .status(404)
        .json({ msg: "No NhanVien found with the given userId" });
    }

    // Nếu userId tồn tại, thêm mới User
    const insertQuery = `
      INSERT INTO [User] (username, password, userId)
      VALUES (@username, @password, @userId)
    `;

    request.input("username", mssql.VarChar, username);
    request.input("password", mssql.VarChar, password);

    await request.query(insertQuery);

    res.status(201).json({ msg: "User created successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Error creating user", error: err.message });
  }
};

// Lấy User theo username
const getUser = (req, res) => {
  const { username } = req.params;
  const request = new mssql.Request();
  request.input("username", mssql.VarChar, username);

  request.query(
    "SELECT * FROM [User] WHERE username = @username",
    (err, result) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .json({ msg: "Error fetching user", error: err.message });
      } else if (result.recordset.length === 0) {
        res.status(404).json({ msg: "No user found with the given username" });
      } else {
        res.status(200).json({ data: result.recordset[0] });
      }
    }
  );
};

// Cập nhật thông tin User
const updateUser = async (req, res) => {
  const { username } = req.params;
  const { password } = req.body;

  try {
    const pool = await mssql.connect();
    const request = new mssql.Request(pool);

    // Hash mật khẩu trước khi lưu vào cơ sở dữ liệu
    const hashedPassword = await bcrypt.hash(password, 10); // 10 là số vòng hash

    const updateQuery = `
        UPDATE [User]
        SET password = @password
        WHERE username = @username
      `;

    request.input("username", mssql.VarChar, username);
    request.input("password", mssql.VarChar, hashedPassword); // Sử dụng mật khẩu đã hash

    const result = await request.query(updateQuery);

    if (result.rowsAffected[0] === 0) {
      res.status(404).json({ msg: "No user found with the given username" });
    } else {
      res.status(200).json({ msg: "User updated successfully" });
    }
  } catch (err) {
    res.status(500).json({ msg: "Error updating user", error: err.message });
  }
};

// Xóa User
const deleteUser = (req, res) => {
  const { username } = req.params;
  const request = new mssql.Request();
  request.input("username", mssql.VarChar, username);

  request.query(
    "DELETE FROM [User] WHERE username = @username",
    (err, result) => {
      if (err) {
        res
          .status(400)
          .json({ msg: "Error deleting user", error: err.message });
      } else if (result.rowsAffected[0] === 0) {
        res.status(404).json({ msg: "No user found with the given username" });
      } else {
        res.status(200).json({ msg: "User deleted successfully" });
      }
    }
  );
};

module.exports = {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
