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

app.get("/", async (req, res) => {
  // Execute a SELECT query
  try {
    const patients = await prisma.benhNhan.findMany();
    res.status(200).json({ data: patients });
  } catch (err) {
    res.status(500).json({ err: "An error occured" });
  }
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
