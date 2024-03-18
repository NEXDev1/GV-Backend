const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const connectDB = require("./database/connection/connection");
const adminController = require("./router/adminRouter");
const authController = require("./router/authRouter");

dotenv.config();

connectDB();

app.use(bodyParser.json());

app.use(cors());

app.use("/api/auth", authController);
app.use("/api/admin/", adminController);

app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
