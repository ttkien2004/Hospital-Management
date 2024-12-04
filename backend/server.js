require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const mssql = require("mssql");

// import routes
const PatientRoutes = require("./routes/PatientRoutes");
const EquipmentRoutes = require("./routes/EquipRoutes");
const MedicineRoutes = require("./routes/MedicineRoutes");
const EmployeeRoutes = require("./routes/EmployeeRoutes");
const NotiRoutes = require("./routes/NotificationRoutes");
const DiseaseRoutes = require("./routes/DiseaseRoutes");
const AllergyRoutes = require("./routes/AllergyRoutes");
const DiseaseSymptomRoutes = require("./routes/DiseaseSymptomRoutes");
const PatientSymptomRoutes = require("./routes/PatientSymptomRoutes");
const UserRoute = require("./routes/UserRoute");
const AuthRoutes = require("./routes/AuthRoutes");
const { PrismaClient } = require("@prisma/client");

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

app.get("/", (request, response) => {
  // Execute a SELECT query
  new mssql.Request().query("SELECT * FROM NhanVien", (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
    } else {
      response.send(result.recordset); // Send query result as response
      console.dir(result.recordset);
    }
  });
});

// Implement API routes
app.use("/api/user", UserRoute);
app.use("/api/auth", AuthRoutes);
app.use("/api/patient", PatientRoutes);
app.use("/api/equipment", EquipmentRoutes);
app.use("/api/employee", EmployeeRoutes);
app.use("/api/notification", NotiRoutes);
app.use("/api/medicine", MedicineRoutes);
app.use("/api/disease", DiseaseRoutes);
app.use("/api/allergy", AllergyRoutes);
app.use("/api/disease-symptom", DiseaseSymptomRoutes);
app.use("/api/patient-symptom", PatientSymptomRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Listen to port ${process.env.PORT}`);
});
connectToDatabase();
