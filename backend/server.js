require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const mssql = require("mssql");

// import routes
const PatientRoutes = require("./routes/PatientRoutes");
const EquipmentRoutes = require("./routes/EquipRoutes");
const EmployeeRoutes = require("./routes/EmployeeRoutes");
const KhoaRoutes = require("./routes/KhoaRoutes");
const DependentRoutes = require("./routes/DependentRoutes");
const AddressRoutes = require("./routes/AddressRoutes");

const { PrismaClient } = require("@prisma/client");
const { error } = require("console");
const prisma = new PrismaClient();

const app = express();
// const prisma = new PrismaClient();

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(cors());

// app.use("/api/hospital", hospitalRoutes);

// const db = mysql.createConnection({
//   host: "",
//   user: "root",
//   password: "kien2004",
//   database: "",
// });

const config = {
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DATABASE,
  options: {
    encrypt: false,
    enableArithAbort: true, // Add this for compatibility
  },
  debug: true,
};

async function connectToDatabase() {
  try {
    const pool = await mssql.connect(config);
    console.log("Connect successfully");
    return pool;
  } catch {
    console.log("Can not connect to db");
  }
}

app.get("/LayLichSuKham", async (req, res) => {
  try {
    const { id } = req.query;
    if (id === null) {
      return res.status(400).json({ error: "ID must not be empty or null" });
    } else if (!id.startsWith("BN")) {
      return res.status(400).json({ error: "ID phải bắt đầu với BN" });
    }
    const pool = await mssql.connect(config);
    const result = await pool
      .request()
      .input("Bn_id", mssql.Char, id) // Pass the parameter
      .execute("LayLichSuKham"); // Name of the procedure
    // console.log(result.recordset);
    return res.status(200).json({ data: result.recordset });
  } catch (err) {
    console.error("SQL error", err);
    return res.status(400).json({ error: "Can not use procedure" });
  } finally {
    await mssql.close();
  }
});

app.use("/LayDonThuoc", async (req, res) => {
  try {
    const { bn_id, date } = req.query;
    if (bn_id === null) {
      return res
        .status(400)
        .json({ error: "ID must not be null or empty string" });
    } else if (!bn_id.startsWith("BN")) {
      return res.status(400).json({ error: "ID bắt buộc bắt đầu với BN" });
    }
    const pool = await mssql.connect(config);
    const query = "SELECT * FROM dbo.LayDonThuoc(@date, @bn_id)";
    const result = await pool
      .request()
      .input("date", mssql.Date, date)
      .input("bn_id", mssql.Char, bn_id)
      .query(query);
    return res.status(200).json({ data: result.recordset });
  } catch (err) {
    return res.status(400).json({ error: "Can not use function" });
  } finally {
    await mssql.close();
  }
});

// async function callFunction() {
//   try {
//     const pool = await mssql.connect(config);
//     const result = await pool
//       .request()
//       .query("SELECT * FROM dbo.GetDiseases(N'mệt mỏi')");

//     console.log(result.recordset);
//   } catch (err) {
//     return res.status(400).json({ msg: "Can not call function" });
//   } finally {
//     await mssql.close();
//   }
// }

app.get("/", async (req, res) => {
  // Execute a SELECT query
  return res.status(200).json({ data: "Hello world" });
});

// Implement API routes
app.use("/api/patient", PatientRoutes);
app.use("/api/equipment", EquipmentRoutes);
app.use("/api/employee", EmployeeRoutes);
app.use("/api/faculty", KhoaRoutes);
app.use("/api/address", AddressRoutes);
app.use("/api/dependence", DependentRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Listen to port ${process.env.PORT}`);
});
connectToDatabase();
