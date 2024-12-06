require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const mssql = require("mssql");

// import routes
const PatientRoutes = require("./routes/PatientRoutes");
const EquipmentRoutes = require("./routes/EquipRoutes");
const EmployeeRoutes = require("./routes/EmployeeRoutes");
const NotiRoutes = require("./routes/NotificationRoutes");
const DiseaseRoutes = require("./routes/DiseaseRoutes");
const AllergyRoutes = require("./routes/AllergyRoutes");
const DiseaseSymptomRoutes = require("./routes/DiseaseSymptomRoutes");
const PatientSymptomRoutes = require("./routes/PatientSymptomRoutes");
const UserRoute = require("./routes/UserRoute");
const AuthRoutes = require("./routes/AuthRoutes");
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
  port: 1433,
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
    console.log(id);
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

app.get("/LayDonThuoc", async (req, res) => {
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

app.get("/MuonThietBi", async (req, res) => {
  const { Thiet_bi_id } = req.query;
  if (Thiet_bi_id === null) {
    return res
      .status(400)
      .json({ error: "ID không được phép mang giá trị null" });
  }
  if (Thiet_bi_id < 0) {
    return res.status(400).json({
      error: "Mã thiết bị không hợp lệ, bắt buộc là số nguyên lớn hơn 0",
    });
  }
  try {
    const pool = await mssql.connect(config);
    const query = "SELECT * FROM dbo.MuonThietBi(@Thiet_bi_id)";
    const result = await pool
      .request()
      .input("Thiet_bi_id", mssql.Int, Thiet_bi_id)
      .query(query);

    return res.status(200).json({ data: result.recordset });
  } catch {
  } finally {
    await mssql.close();
  }
});

app.get("/", async (req, res) => {
  // Execute a SELECT query
  return res.status(200).json({ data: "Hello world" });
});

// Implement API routes
app.use("/api/user", UserRoute);
app.use("/api/auth", AuthRoutes);
app.use("/api/patient", PatientRoutes);
app.use("/api/equipment", EquipmentRoutes);
app.use("/api/employee", EmployeeRoutes);
app.use("/api/notification", NotiRoutes);
// app.use("/api/medicine", MedicineRoutes);
app.use("/api/disease", DiseaseRoutes);
app.use("/api/allergy", AllergyRoutes);
app.use("/api/disease-symptom", DiseaseSymptomRoutes);
app.use("/api/patient-symptom", PatientSymptomRoutes);
app.use("/api/khoa", KhoaRoutes);
// app.use("/api/chinhanh", CnRoutes);
// app.use("/api/thuoc", ThuocRoutes);
app.use("/api/faculty", KhoaRoutes);
app.use("/api/address", AddressRoutes);
app.use("/api/dependence", DependentRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Listen to port ${process.env.PORT}`);
});
connectToDatabase();
