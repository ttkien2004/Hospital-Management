const mssql = require("mssql");
const bcrypt = require("bcrypt");

// Register a new user
const register = async (req, res) => {
  const { username, password, userId } = req.body;

  try {
    const pool = await mssql.connect();
    const request = new mssql.Request(pool);

    // Check if the username already exists
    const checkQuery =
      "SELECT COUNT(*) AS count FROM [User] WHERE username = @username";
    request.input("username", mssql.VarChar, username);

    const checkResult = await request.query(checkQuery);

    if (checkResult.recordset[0].count > 0) {
      return res.status(400).json({ msg: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user
    const insertQuery = `
      INSERT INTO [User] (username, password, userId)
      VALUES (@username, @password, @userId)
    `;

    request.input("password", mssql.VarChar, hashedPassword);
    request.input("userId", mssql.Char, userId);

    await request.query(insertQuery);

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error registering user", error: err.message });
  }
};

// User login
const login = async (req, res) => {
  const { username, password } = req.body;

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
          END AS employeeType
        FROM [User] u
        INNER JOIN NhanVien nv ON u.userId = nv.ID
        LEFT JOIN QuanTriVien qtv ON nv.ID = qtv.QtvID
        LEFT JOIN DuocSi ds ON nv.ID = ds.DuocSiID
        LEFT JOIN BacSi bs ON nv.ID = bs.BsID
        LEFT JOIN YTa yta ON nv.ID = yta.YtaID
        WHERE u.username = @username
      `;
    request.input("username", mssql.VarChar, username);

    const userResult = await request.query(userQuery);

    if (userResult.recordset.length === 0) {
      return res.status(404).json({ msg: "User not found" });
    }

    const user = userResult.recordset[0];

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid username or password" });
    }

    // Trả về thông tin người dùng và loại nhân viên
    res.status(200).json({
      msg: "Login successful",
      user: {
        username: user.username,
        userId: user.userId,
        fullName: `${user.Ho} ${user.TEN}`,
        employeeId: user.ID,
        employeeType: user.employeeType, // Trả về loại nhân viên
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
