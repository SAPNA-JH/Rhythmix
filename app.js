
const pool = require("./src/config/db");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const songRoutes  = require("./src/routes/songRoutes")
const authRoutes = require("./src/routes/authRoutes")
 

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", songRoutes);
app.use("/auth", authRoutes);


app.listen(5000, ()=> {
    console.log("Server running on port 50000");
})