require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const hospitalRoutes = require("./routes/hospitalRoutes");

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(cors());

app.use("/api/hospital", hospitalRoutes);

const db = mysql.createConnection({
  host: "",
  user: "root",
  password: "kien2004",
  database: "",
});

app.listen(process.env.PORT, () => {
  console.log(`Listen to port ${process.env.PORT}`);
});
