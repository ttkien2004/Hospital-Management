const mssql = require("mssql");
const bcrypt = require("bcrypt");

// Register a new user
const register = async (req, res) => {
  const { UserName, UserPassword, UserID } = req.body;

  try {
    const pool = await mssql.connect();
    const request = new mssql.Request(pool);

    // Check if the UserName already exists
    const checkQuery =
      "SELECT COUNT(*) AS count FROM Users WHERE UserName = @UserName";
    request.input("UserName", mssql.VarChar, UserName);

    const checkResult = await request.query(checkQuery);

    if (checkResult.recordset[0].count > 0) {
      return res.status(400).json({ msg: "UserName already exists" });
    }

    // Hash the UserPassword
    const hashedUserPassword = await bcrypt.hash(UserPassword, 10);

    // Insert the new user
    const insertQuery = `
      INSERT INTO Users (UserName, UserPassword, UserID)
      VALUES (@UserName, @UserPassword, @UserID)
    `;

    request.input("UserPassword", mssql.VarChar, hashedUserPassword);
    request.input("UserID", mssql.Char, UserID);

    await request.query(insertQuery);

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error registering user", error: err.message });
  }
};

// User login
const login = async (req, res) => {
  const { UserName, UserPassword } = req.body;

  try {
    const pool = await mssql.connect();
    const request = new mssql.Request(pool);

    // Truy vấn kết hợp để lấy thông tin người dùng và loại nhân viên
    const userQuery = `
        SELECT u.*, nv.Ho, nv.TEN, nv.ID,
          CASE
            WHEN qtv.QtvID IS NOT NULL THEN 'QuanTriVien'
            WHEN ds.DuocSiID IS NOT NULL THEN 'DuocSi'
            WHEN bs.BsID IS NOT NULL THEN 'BacSi'
            WHEN yta.YtaID IS NOT NULL THEN 'YTa'
            ELSE 'Unknown'
          END AS UserType
        FROM Users u
        INNER JOIN NhanVien nv ON u.UserID = nv.ID
        LEFT JOIN QuanTriVien qtv ON nv.ID = qtv.QtvID
        LEFT JOIN DuocSi ds ON nv.ID = ds.DuocSiID
        LEFT JOIN BacSi bs ON nv.ID = bs.BsID
        LEFT JOIN YTa yta ON nv.ID = yta.YtaID
        WHERE u.UserName = @UserName
      `;
    request.input("UserName", mssql.VarChar, UserName);

    const userResult = await request.query(userQuery);

    if (userResult.recordset.length === 0) {
      return res.status(404).json({ msg: "User not found" });
    }

    const user = userResult.recordset[0];

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(UserPassword, user.UserPassword);
    // console.log(isMatch);

    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid UserName or UserPassword" });
    }

    // Trả về thông tin người dùng và loại nhân viên
    res.status(200).json({
      msg: "Login successful",
      user: {
        UserName: user.UserName,
        UserID: user.UserID,
        fullName: `${user.Ho} ${user.TEN}`,
        employeeId: user.ID,
        UserType: user.UserType, // Trả về loại nhân viên
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error during login", error: err.message });
  }
};

module.exports = {
  register,
  login,
};
