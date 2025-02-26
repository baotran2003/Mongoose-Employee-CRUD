const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const employeeRoutes = require("./routes/employees");

dotenv.config({ path: "./config.env" });

// Connect MongoDB Database
mongoose
    .connect(process.env.DATABASE_LOCAL)
    .then(() => {
        console.log("Connect To MongoDB Successful!");
    })
    .catch((err) => {
        console.error("Connect To MongoDB Fail !:", err);
    });

app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));

// middleware for method override
app.use(methodOverride("_method"));

app.use(employeeRoutes);

const port = process.env.PORT;
app.listen(port, () => {
    console.log("Server started on port 3000.");
});
