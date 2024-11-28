require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const mssql = require("mssql");
const PatientRoutes = require("./routes/PatientRoutes");

const app = express();

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

app.use("/api/hospital", PatientRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Listen to port ${process.env.PORT}`);
});
connectToDatabase();
